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
						<p>{ __( 'The code block embeds code snippets from CodePen. The text in the block will load as a fallback if there is an issue loading the CodePen embed.', 'codepen' ) }</p>
					</BlockDescription>
					<div className="blocks-base-control blocks-codepen-embed-control">
						<label htmlFor="blocks-codepen-embed-control-pen-id" className="blocks-base-control__label">
							{ __( 'Pen ID:', 'codepen' ) }
						</label>
						<input // eslint-disable-line jsx-a11y/no-onchange
							id="blocks-codepen-embed-control-pen-id"
							type="text"
							class="blocks-text-control__input"
							onChange={ ( { target: { value } } ) => setAttributes( { penID: value } ) }
							value={ penID }
						/>
					</div>
					<div className="blocks-base-control blocks-codepen-embed-control">
						<label htmlFor="blocks-codepen-embed-control-pen-height" className="blocks-base-control__label">
							{ __( 'Pen Height:', 'codepen' ) }
						</label>
						<input // eslint-disable-line jsx-a11y/no-onchange
							id="blocks-codepen-embed-control-pen-height"
							type="text"
							class="blocks-text-control__input"
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
							class="blocks-text-control__input"
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
				onChange={ ( event ) => setAttributes( { content: event.target.value } ) }
				placeholder={ __( 'CodePen embed fallback text', 'codepen' ) }
				aria-label={ __( 'CodePen embed fallback text', 'codepen' ) }
			/>,
		];
	},

	save( { attributes } ) {
		const { penID, themeID, penHeight, content } = attributes;
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