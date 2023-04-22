<template>
    <div class="panel__top">
        <div class="panel__basic-actions"></div>
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
    </div>
    <div class="editor-row">
        <div class="editor-canvas">
            <div id="gjs">
                <h1>Hello World Component!</h1>
            </div>
        </div>
        <div class="panel__right">
            <div class="layers-container"></div>
        </div>
    </div>
    <div id="blocks"></div>
</template>
<script setup>
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import { onMounted } from "vue";
onMounted(() => {
    const editor = grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        container: "#gjs",
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: "300px",
        width: "auto",
        mediaCondition: "min-width",
        deviceManager: {
            devices: [
                {
                    name: "Mobile",
                    width: "320",
                    widthMedia: "",
                },
                {
                    name: "Desktop",
                    width: "",
                    widthMedia: "1024",
                },
            ],
        },
        // Disable the storage manager for the moment
        storageManager: {
            type: "local", // Type of the storage, available: 'local' | 'remote'
            autosave: true, // Store data automatically
            autoload: true, // Autoload stored data on init
            stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
            options: {
                local: {
                    // Options for the `local` type
                    key: "gjsProject", // The key for the local storage
                },
            },
        },
        // Avoid any default panel
        blockManager: {
            appendTo: "#blocks",
            blocks: [
                {
                    id: "section", // id is mandatory
                    label: "<b>Section</b>", // You can use HTML/SVG inside labels
                    attributes: { class: "gjs-block-section" },
                    content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
                },
                {
                    id: "text",
                    label: "Text",
                    content: '<div data-gjs-type="text">Insert your text here</div>',
                },
                {
                    id: "image",
                    label: "Image",
                    // Select the component once it's dropped
                    select: true,
                    // You can pass components as a JSON instead of a simple HTML string,
                    // in this case we also use a defined component type `image`
                    content: { type: "image" },
                    // This triggers `active` event on dropped components and the `image`
                    // reacts by opening the AssetManager
                    activate: true,
                },
                {
                    id: "section 2", // id is mandatory
                    label: "<b>Section 2</b>", // You can use HTML/SVG inside labels
                    attributes: { class: "gjs-block-section" },
                    media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
        </svg>`,
                    // Use `image` component
                    content: [
                        // BAD: You risk to create conflicting styles
                        { type: "my-cmp", styles: ".cmp { color: red }" },
                        { type: "my-cmp", styles: ".cmp { color: green }" },

                        // REALLY BAD: In case all related components are removed,
                        // there is no safe way for the editor to know how to connect
                        // and clean your styles.
                        `<div class="el">Element</div>
    <div class="el2">Element 2</div>
    <style>
      .el { color: blue }
      .el2 { color: violet }
    </style>`,
                    ],
                },
            ],
        },
        layerManager: {
            appendTo: ".layers-container",
        },
        // We define a default panel as a sidebar to contain layers
        panels: {
            defaults: [
                {
                    id: "layers",
                    el: ".panel__right",
                    // Make the panel resizable
                    resizable: {
                        maxDim: 350,
                        minDim: 200,
                        tc: 0, // Top handler
                        cl: 1, // Left handler
                        cr: 0, // Right handler
                        bc: 0, // Bottom handler
                        // Being a flex child we need to change `flex-basis` property
                        // instead of the `width` (default)
                        keyWidth: "flex-basis",
                    },
                },
            ],
        },
    });
    editor.Panels.addPanel({
        id: "panel-top",
        el: ".panel__top",
    });
    editor.Panels.addPanel({
        id: "basic-actions",
        el: ".panel__basic-actions",
        buttons: [
            {
                id: "visibility",
                active: true, // active by default
                className: "btn-toggle-borders",
                label: "<u>B</u>",
                command: "sw-visibility", // Built-in command
            },
            {
                id: "export",
                className: "btn-open-export",
                label: "Exp",
                command: "export-template",
                context: "export-template", // For grouping context of buttons from the same panel
            },
            {
                id: "show-json",
                className: "btn-show-json",
                label: "JSON",
                context: "show-json",
                command(editor) {
                    editor.Modal.setTitle("Components JSON")
                        .setContent(
                            `<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`
                        )
                        .open();
                },
            },
        ],
    });
});
</script>
<style>
#gjs {
    border: 3px solid #444;
}

/* Reset some default styling */
.gjs-cv-canvas {
    top: 0;
    width: 100%;
    height: 100%;
}
.gjs-block {
    width: auto;
    height: auto;
    min-height: auto;
}
.panel__top {
    padding: 0;
    width: 100%;
    display: flex;
    position: initial;
    justify-content: center;
    justify-content: space-between;
}
.panel__basic-actions {
    position: initial;
}
.editor-row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    height: 300px;
}

.editor-canvas {
    flex-grow: 1;
}

.panel__right {
    flex-basis: 230px;
    position: relative;
    overflow-y: auto;
}
.panel__devices {
    position: initial;
}
</style>
