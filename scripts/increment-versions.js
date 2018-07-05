// Increment versions in plugin.xml files

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const semver = require('semver')

const sourceDir = process.env["BUILD_SOURCESDIRECTORY"];
console.log("BUILD_SOURCESDIRECTORY: " + sourceDir)

const moduleNames = [
    "cordova-plugin-appcenter-analytics",
    "cordova-plugin-appcenter-crashes",
    "cordova-plugin-appcenter-push",
    "cordova-plugin-appcenter-shared"
];

for (const moduleName of moduleNames) {
    const pluginXmlPath = path.join(sourceDir, moduleName, "plugin.xml");
    const parser = new xml2js.Parser({ includeWhiteChars: true });
    const pluginXmlContents = fs.readFileSync(pluginXmlPath);

    parser.parseString(pluginXmlContents, function (err, parsedXml) {
        console.log(moduleName + " plugin.xml: " + pluginXmlPath);

        if (err) {
            throw err;
        }

        console.log("current version: " + parsedXml.plugin["$"].version);
        parsedXml.plugin["$"].version = semver.inc(parsedXml.plugin["$"].version, "patch");
        console.log("new version: " + parsedXml.plugin["$"].version);

        if (parsedXml.plugin.dependency) {
            for (const dependency of parsedXml.plugin.dependency) {
                if (dependency["$"].id === "cordova-plugin-appcenter-shared") {
                    console.log("current version of cordova-plugin-appcenter-shared dependency: " + dependency["$"].version)
                    dependency["$"].version = semver.inc(dependency["$"].version, "patch");
                    console.log("new version of cordova-plugin-appcenter-shared dependency: " + dependency["$"].version)
                }
            }
        }

        const builder = new xml2js.Builder({
            xmldec: { version: "1.0", encoding: "utf-8" },
            renderOpts: { pretty: true, indent: "    " }
        });
        const xml = builder.buildObject(parsedXml).replace(/&#xD;/g, "");
        fs.writeFileSync(pluginXmlPath, xml);
    });
}
