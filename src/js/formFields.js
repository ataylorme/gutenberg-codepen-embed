/**
 * Import internal dependencies
 */
import getPenID from './getPenID.js';

/**
 * Get WordPress libraries from the wp global
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { TextControl, ToggleControl, SelectControl } = wp.components;
const { Component } = wp.element;

export default function formFields(attributes, setAttributes) {
    const { penID, penHeight, penType, clickToLoad, penTheme } = attributes;

    /**
     * Declare variables
     */
    const penTypeOptions = [
        {value: 'result', label: __( 'Result only' ) },
        {value: 'html,result', label: __( 'HTML and result' ) },
        {value: 'js,result', label: __( 'JavaScript and result' ) },
        {value: 'css,result', label: __( 'CSS and result' ) },
    ];

    const penThemeOptions = [
        {value: '0', label: __( 'Default' ) },
        {value: 'light', label: __( 'Light' ) },
        {value: 'dark', label: __( 'Dark' ) },
    ];

    return (

        <InspectorControls>
            <TextControl 
                label={ __( 'Pen Height (in pixels)' ) } 
                onChange={ ( value ) => setAttributes( { penHeight: Number.parseInt( value, 10 ) } ) }
                value={penHeight}
                type='number'
            />
            <SelectControl
                label={ __( 'Pen Theme' ) } 
                select={penTheme} 
                options={penThemeOptions} 
                onChange={ ( value ) => setAttributes( { penTheme: value } ) } 
                value={ penTheme }
            />
            <SelectControl
                label={ __( 'Pen View' ) } 
                select={penType} 
                options={penTypeOptions} 
                onChange={ ( value ) => setAttributes( { penType: value } ) } 
                value={ penType }
            />
            <ToggleControl
                label={ __( 'Use click-to-load (increases performance)' ) }
                checked={ !! clickToLoad }
                onChange={ () => setAttributes( { clickToLoad: ! clickToLoad } ) }
            />
        </InspectorControls>
    );
}