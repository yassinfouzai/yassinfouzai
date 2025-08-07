import React, { useEffect, useState, useRef } from "react";

function BasicInfo() {
    const [location, setLocation] = useState("");
    const [timezone, setTimezone] = useState("UTC");
    const [localHour, setLocalHour] = useState("—");
    const [localDate, setLocalDate] = useState("—");


    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const opencageToken = import.meta.env.VITE_OPENCAGE_TOKEN;
    
    const hourIntervalRef = useRef(null);

    const fetchData = () => {
        fetch("https://api.github.com/user", {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${githubToken}`,
            },
        })
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => {
            const loc = data.location || "No location set";
            setLocation(loc);
            if (loc !== "No location set") {
                fetchTimezoneFromLocation(loc);
            }
        })
        .catch(() => setLocation("Error fetching location"));
    };

    const fetchTimezoneFromLocation = async (city) => {
        try {
            const res = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${opencageToken}`
            );
            const data = await res.json();
            const tz = data.results[0]?.annotations?.timezone?.name || "UTC";
            setTimezone(tz);
        } catch {
            setTimezone("UTC");
        }
    };

    const updateHour = () => {
        try {
            const now = new Date();
            const optionsNow = {
                hour: "numeric",
                hour12: true,
                timeZone: timezone,
            };
            const date = new Date();
            const optionsDate = {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: timezone,
            };



            const formatterNow = new Intl.DateTimeFormat("en-US", optionsNow);
            const formatterDate = new Intl.DateTimeFormat("en-US", optionsDate);
            setLocalHour(formatterNow.format(now));
            setLocalDate(formatterDate.format(now));
        } catch {
            setLocalHour("—");
            setLocalDate("_");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!timezone) return;

        const startInterval = () => {
            if (hourIntervalRef.current) return;
            updateHour();
            hourIntervalRef.current = setInterval(updateHour, 1000);
        };

        const stopInterval = () => {
            if (hourIntervalRef.current) {
                clearInterval(hourIntervalRef.current);
                hourIntervalRef.current = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopInterval();
            } else {
                startInterval();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        startInterval();

        return () => {
            stopInterval();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [timezone]);

    return (
        <div>
            <div style={{ textTransform: "capitalize" }}>{location}, {localHour}, {localDate}</div>
        </div>
    );
}

export default BasicInfo;

