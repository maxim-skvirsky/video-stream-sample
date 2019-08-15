const validate_ip = require("./ip_validator");
const geoip = require("geo-from-ip");

module.exports = function parseRequest(query) {
  let ip, os, os_version, app_name, lat, device, network, ifa, geodata;
  if (query) {
    ip = query.ip;
    geodata = ip && validate_ip(ip) ? geoip.allData(query.ip) : null;
    os = query.os || null;
    os_version = query.os_version || null;
    app_name = query.app_name || null;
    lat = query.lat_string === "true";
    device = query.device || null;
    ifa = query.ifa || null;
    network = query.network || null;
  }
  console.log({
    ip,
    os,
    os_version,
    app_name,
    lat,
    device,
    network,
    ifa,
    geodata
  });
  return { ip, os, os_version, app_name, lat, device, network, ifa, geodata };
};
