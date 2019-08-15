const fs = require("fs");
const path = __dirname + "/../rules/rules.json";

function Cache() {
  this.cache = JSON.parse(fs.readFileSync(path));
  if (!this.cache) {
    console.error("could not load rules from file!");
  } else {
    console.log("Loaded rules from persistance");
  }
}

Cache.prototype.get = function(property) {
  console.log(this.cache);
  return this.cache[property];
};

Cache.prototype.getAll = function() {
  return this.cache;
};

Cache.prototype.getByAppName = function(appname) {
  if (Object.keys(this.cache).indexOf(appname) > -1) {
    return this.cache[appname];
  } else {
    return null;
  }
};

Cache.prototype.getById = function(id) {
  for (appRules in this.cache) {
    appRules = this.cache[appRules].filter(appRule => {
      return appRule.id == id ? appRule : null;
    });
    if (appRules.length == 1) {
      return appRules;
    }
  }
  return null;
};

Cache.prototype.addToCache = function(item) {
  if (Object.keys(this.cache).indexOf(item.appname) === -1) {
    this.cache[item.appname] = [];
  }
  item.id = Date.now();
  this.cache[item.appname].push(item);
  console.log("Updated rules successfully");
  persist(this.cache);
  return item;
};

Cache.prototype.delete = function(id) {
  let deleteFlag = false;
  for (appRules in this.cache) {
    this.cache[appRules] = this.cache[appRules].filter(rule => {
      if (rule.id == id) {
        deleteFlag = true;
        return null;
      }
      return rule;
    });
  }
  if (deleteFlag) {
    for (appRules in this.cache) {
      if (this.cache[appRules].length == 0) {
        delete this.cache[appRules];
      }
    }
    persist(this.cache);
  }
  return deleteFlag;
};

const persist = function(data) {
  fs.writeFile(path, JSON.stringify(data), err => {
    if (err) {
      console.error("Error updating rules on disk");
    } else {
      console.log("Persisted rules successfully");
    }
  });
};

module.exports = new Cache();
