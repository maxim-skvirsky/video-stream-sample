const validate_ip = require("./ip_validator");

module.exports = function parseRequest(request) {
  let ip, os, os_version, app_name, lat, device, network, ifa, geodata;
  if (request.query) {
    ip = request.query.ip;
    geodata = ip && validate_ip(ip) ? geoip.allData(request.query.ip) : null;
    os = request.query.os || null;
    os_version = request.query.os_version || null;
    app_name = request.query.app_name || null;
    lat = request.query.lat_string === "true";
    device = request.query.device || null;
    ifa = request.query.ifa || null;
    network = request.query.network || null;
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
