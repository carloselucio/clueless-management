/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react"
]);

module.exports = withTM({
  images: {
    domains: [
      "links.papareact.com",
      "https://picsum.photos",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com" 
    ]
  },
  reactStrictMode: true
})