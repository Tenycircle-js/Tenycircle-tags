class HTMLScript {
    constructor(name, action) {
        this.name = name;
        this.action = action;
    }
    execute() {
        this.action();
    }
}

const customTags = {};

function parseHTML(content) {
    let result = content;

    for (let tag in customTags) {
        const regex = new RegExp(tag, 'g');
        result = result.replace(regex, `</htmlscript execute='${customTags[tag].name}'></htmlscript>`);
    }

    return result;
}

function executeScripts(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const scripts = Array.from(doc.querySelectorAll('htmlscript[execute]'));

    scripts.forEach(script => {
        const name = script.getAttribute('execute');
        const htmlScript = customTags[name];
        if (!htmlScript) {
            console.warn(`No HTMLScript has been found for '${name}'.`);
            return;
        }
        htmlScript.execute();
    });
}
