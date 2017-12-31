/**
 * BLOCK: Gutenberg CodePen Embed
 *
 * Adds Gutenberg block for embedding Pens from CodePen
 */

import TextareaAutosize from 'react-autosize-textarea';

// Import __() from wp.i18n
const { __ } = wp.i18n;

// Import registerBlockType() from wp.blocks
const { registerBlockType, InspectorControls, BlockDescription } = wp.blocks;

// Get Pen ID from CodePen URL
function getPenID( content ) {
	let matches_array = content.match(/http[s]?:\/\/codepen\.io\/[^\/]+\/[pen|details|full|pres]+\/([a-zA-Z]{6})/);
	return ( Array.isArray( matches_array ) ) ? matches_array[1] : null;
}

/**
 * Register Block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'codepen/codepen-embed', {
	title: __( 'CodePen Embed', 'codepen' ),
	
	icon: 'media-code',
	
	category: 'embed',

	attributes: {
		content: {
			type: 'string',
			source: 'property',
			selector: 'p.codepen',
			property: 'textContent',
		},
		penID: {
			type: 'string',
		},
		themeID: {
			type: 'string',
			default: '1',
		},
		penHeight: {
			type: 'string',
			default: '250',
		},
	},

	supports: {
		html: false,
	},

	edit( { attributes, setAttributes, focus, className } ) {
		const { penID, themeID, penHeight, content } = attributes;
		return [
			focus && (
				<InspectorControls key="inspector">
					<BlockDescription>
						<p>{ __( 'This block embeds Pens from CodePen. Simply enter any text that includes a CodePen URL in the block. If there is an issue loading the CodePen embed the text will be used as a fallback.', 'codepen' ) }</p>
					</BlockDescription>
					<div className="blocks-base-control blocks-codepen-embed-control">
						<label htmlFor="blocks-codepen-embed-control-pen-height" className="blocks-base-control__label">
							{ __( 'Pen Height:', 'codepen' ) }
						</label>
						<input // eslint-disable-line jsx-a11y/no-onchange
							id="blocks-codepen-embed-control-pen-height"
							type="text"
							className="blocks-text-control__input"
							onChange={ ( { target: { value } } ) => setAttributes( { penHeight: value } ) }
							value={ penHeight }
						/>
					</div>
					<div className="blocks-base-control blocks-codepen-embed-control">
						<label htmlFor="blocks-codepen-embed-control-pen-theme-id" className="blocks-base-control__label">
							{ __( 'Theme ID:', 'codepen' ) }
						</label>
						<input // eslint-disable-line jsx-a11y/no-onchange
							id="blocks-codepen-embed-control-pen-theme-id"
							type="text"
							className="blocks-text-control__input"
							onChange={ ( { target: { value } } ) => setAttributes( { themeID: value } ) }
							value={ themeID }
						/>
					</div>
				</InspectorControls>
			),
			<TextareaAutosize
				key="block"
				className={ className }
				value={ content }
				onChange={ ( event ) => setAttributes( { content: event.target.value, penID: getPenID(event.target.value) } ) }
				placeholder={ __( 'CodePen embed text', 'codepen' ) }
				aria-label={ __( 'CodePen embed text', 'codepen' ) }
			/>,
		];
	},

	save( { attributes } ) {
		const { penID, themeID, penHeight, content } = attributes;
		if( null === penID ){
			return (
				<p className="codepen">
					{content}
				</p>
			)
		}
		return (
			<div>
				<p className="codepen" data-height={penHeight} data-theme-id={themeID} data-slug-hash={penID} data-default-tab='result' data-animations='stop-after-5'>
					{content}
				</p>
				<script async src="//codepen.io/assets/embed/ei.js"></script>
			</div>
		);
	},
} );