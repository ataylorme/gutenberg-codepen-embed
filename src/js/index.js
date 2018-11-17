/**
 * Import internal dependencies
 */
import blockIcons from './icons.js';
import formFields from './formFields.js';
import getPenHTML from './getPenHTML.js';
import getPenID from './getPenID.js';

/**
 * Get WordPress libraries from the wp global
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

/**
 * Register Block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'codepen/codepen-embed', {
	title: __( 'CodePen Embed' ),
    
    description: __( 'Embeds a CodePen Pen' ),
	
	icon: blockIcons.codepen,
	
	category: 'embed',

	attributes: {
		content: {
            type: 'string',
            default: '',
		},
		penURL: {
            type: 'string',
            default: '',
		},
		penID: {
            type: 'string',
            default: '',
		},
		penType: {
            type: 'string',
            default: 'result',
		},
		penHeight: {
			type: 'integer',
			default: 250,
		},
		penTheme: {
			type: 'string',
			default: '0',
		},
		clickToLoad: {
			type: 'boolean',
			default: true,
		},
	},

	supports: {html: true},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { penURL } = attributes;
        
        return [
			!! isSelected && (
                formFields( attributes, setAttributes)
			),
			( <TextControl 
                key="penURL-input"
                style={{textAlign: 'center', border: 'solid 1px rgba(100,100,100,0.25)'}}
                onChange={ ( value ) => setAttributes( { penURL: value, penID: getPenID(value) } ) }
                value={penURL}
                placeholder={  __('Enter a pen URL...') }
                label={ null }
            /> ),
			( penURL === '' || ! penURL.length ) ? 
			(
                <div className={`${className} error`}>
                    <p style={{textAlign: 'center'}}>
                        {__( 'A pen URL is required. Please enter one in the field above.')  }
                    </p>
                </div>
			) : 
			getPenHTML( attributes, className, true)
		];
	},

	save( { attributes } ) {
        return getPenHTML( attributes );
	},
} );