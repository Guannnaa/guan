🌐 Personal Portfolio Web Project – Enda Şenol
🎯 Project Overview

This project is a personal portfolio website developed to present the academic background, technical skills, and GIS-focused engineering projects of Enda Şenol, a Geomatics Engineering student at Hacettepe University. The website consists of three main sections: About, Technologies, and Projects, and is designed with a modern, responsive user interface using advanced CSS effects such as glassmorphism and animated gradients.

💻 Technologies Used
Technology	Purpose
HTML5	Structure and content layout
CSS3 (Glassmorphism, Glow Effects)	Visual design and responsive layout
JavaScript (Vanilla)	Interactivity and map integration
OpenLayers	Intended mapping library for GIS integration
Google Maps Embed API	Backup map solution due to network (DNS/CDN) restrictions
🌍 Mapping Integration & Technical Challenge

The initial goal of the project was to integrate an interactive map of Hacettepe University Beytepe Campus using OpenLayers, a powerful open-source GIS library widely used in geospatial applications.

However, during development:

The OpenLayers library required loading via CDN (jsDelivr, unpkg).

The network environment applied DNS and CDN blocking, preventing ol.js and ol.css files from being fetched.

Multiple versions and fallback scripts were tested, but the restrictions persisted due to network-level access control, not coding errors.

Because this was a submission-critical project, a strategic fallback solution was applied.

✅ Final Decision:
Google Maps Embed API was used as a fallback to ensure map functionality continues to exist, providing visual correctness and usability while bypassing the CDN limitation.

This showcases real-world engineering adaptability—choosing an alternative method to ensure deliverability under network constraints.

📂 Website Sections
🔹 About

Includes personal biography, education background, internships, and career focus.

Profile avatar, blur effects, and animated header are used to enhance user engagement.

🔹 Technologies

Lists software and tools with corresponding proficiency levels (in percentage).

Visual progress bars included to increase clarity and visual appeal.

🔹 Projects

Shopping Mall Data Web Scraping & API Development

3D Mining Site Modeling

Women Safety Mapping Application
Each project is supported with images and concise descriptions.

🚀 Outcomes & Skills Gained

Web development and user interface design

Map technologies and GIS web integration

Problem-solving under network restrictions

Responsive portfolio creation with real-world deployment focus

🔮 Future Improvements

Integrating OpenLayers with locally hosted modules (offline mode)

Adding WMS/WFS geoserver layers

Backend integration using PostgreSQL + PostGIS

Creating user-interactive spatial analysis tools

📌 Conclusion

This portfolio demonstrates both technical knowledge and practical adaptability in geospatial web development. The fallback to Google Maps due to DNS restrictions is not a limitation, but rather a deliberate engineering decision to ensure reliability in restricted environments.