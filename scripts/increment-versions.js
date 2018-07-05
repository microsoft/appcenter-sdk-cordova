// Increment versions in plugin.xml files

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const semver = require('semver');

const sourceDir = process.env["BUILD_SOURCESDIRECTORY"];
console.log(`BUILD_SOURCESDIRECTORY: ${sourceDir}`);

const pluginNames = [
    "cordova-plugin-appcenter-shared",
    "cordova-plugin-appcenter-analytics",
    "cordova-plugin-appcenter-crashes",
    "cordova-plugin-appcenter-push"
]

for (const pluginName of pluginNames) {
    const pluginXmlPath = path.join(sourceDir, pluginName, "plugin.xml");
    const parser = new xml2js.Parser({ includeWhiteChars: true });
    const pluginXmlContents = fs.readFileSync(pluginXmlPath);

    parser.parseString(pluginXmlContents, function (err, parsedXml) {
        console.log(`${pluginName} plugin.xml: ${pluginXmlPath}`);

        if (err) {
            throw err;
        }

        console.log(`current version: ${parsedXml.plugin.$.version}`);
        parsedXml.plugin.$.version = semver.inc(parsedXml.plugin.$.version, "patch");
        console.log(`new version: ${parsedXml.plugin.$.version}`);

        if (parsedXml.plugin.dependency) {
            for (const dependency of parsedXml.plugin.dependency) {
                if (dependency.$.id === "cordova-plugin-appcenter-shared") {
                    console.log(`current version of cordova-plugin-appcenter-shared dependency: ${dependency.$.version}`);
                    dependency.$.version = semver.inc(dependency.$.version, "patch");
                    console.log(`new version of cordova-plugin-appcenter-shared dependency: ${dependency.$.version}`);
                }
            }
        }

        saveXml(parsedXml, pluginXmlPath);
    });
}

const demoappConfigPath = path.join(sourceDir, "demoapp", "config.xml");
const demoappConfigContents = fs.readFileSync(demoappConfigPath);
const parser = new xml2js.Parser({ includeWhiteChars: true });

parser.parseString(demoappConfigContents, function (err, parsedXml) {
    console.log(`demo app config.xml: ${demoappConfigPath}`);

    if (err) {
        throw err;
    }

    for (const plugin of parsedXml.widget.plugin) {
        if (pluginNames.includes(plugin.$.name)) {
            console.log(`current version of ${plugin.$.name}: ${plugin.$.spec}`);
            plugin.$.spec = "^" + semver.inc(plugin.$.spec.replace("^", ""), "patch");
            console.log(`new version of ${plugin.$.name}: ${plugin.$.spec}`);
        }
    }

    saveXml(parsedXml, demoappConfigPath);
});

function saveXml(xmlObj, filePath) {
    const builder = new xml2js.Builder({
        xmldec: { version: "1.0", encoding: "utf-8" },
        renderOpts: { pretty: true, indent: "    " }
    });
    const xml = builder.buildObject(xmlObj).replace(/&#xD;/g, "");
    fs.writeFileSync(filePath, xml);
}
