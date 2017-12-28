<?php
/**
 * Plugin Name: Gutenberg CodePen Embed
 * Plugin URI: https://codepen.io/
 * Description: Adds Gutenberg block for embedding Pens from <a href="http://codepen.io/">CodePen</a>. You can learn more about CodePen <a href="http://codepen.io/hello">here </a>.
 * Author: Andrew Taylor
 * Author URI: https://www.ataylor.me/
 * Version: 1.0.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package Gutenberg_CodePen_Embed
 * @since   1.0.0
 */
namespace Gutenberg_CodePen_Embed;

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

// Hook: Editor assets.
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\\Editor_assets');

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since  1.0.0
 * @return void
 */
function Editor_assets()
{
    // Scripts.
    wp_enqueue_script(
        'gb-block-02-basic-esnext', // Handle.
        plugins_url('block.build.js', __FILE__), // Block.build.js: We register the block here. Built with Webpack.
        array('wp-blocks', 'wp-i18n', 'wp-element'), // Dependencies, defined above.
        filemtime(plugin_dir_path(__FILE__) . 'block.js') // filemtime — Gets file modification time.
    );

    // Styles.
    wp_enqueue_style(
        'gb-block-02-basic-esnext-editor', // Handle.
        plugins_url('editor.css', __FILE__), // Block editor CSS.
        array('wp-edit-blocks'), // Dependency to include the CSS after it.
        filemtime(plugin_dir_path(__FILE__) . 'editor.css') // filemtime — Gets file modification time.
    );
} // End function editor_assets().


// Hook: Frontend assets.
add_action('enqueue_block_assets', __NAMESPACE__ . '\\Block_assets');

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since  1.0.0
 * @return void
 */
function Block_assets()
{
    // Styles.
    wp_enqueue_style(
        'gb-block-02-basic-esnext-frontend', // Handle.
        plugins_url('style.css', __FILE__), // Block frontend CSS.
        array('wp-blocks'), // Dependency to include the CSS after it.
        filemtime(plugin_dir_path(__FILE__) . 'editor.css') // filemtime — Gets file modification time.
    );
} // End function block_assets().
