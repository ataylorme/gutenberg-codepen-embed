<?php
/**
 * Plugin Name: Gutenberg CodePen Embed
 * Plugin URI: https://codepen.io/
 * Description: Adds Gutenberg block for embedding Pens from <a href="http://codepen.io/">CodePen</a>. You can learn more about CodePen <a href="http://codepen.io/hello">here </a>.
 * Author: Andrew Taylor
 * Author URI: https://www.ataylor.me/
 * Version: 2.0.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package Gutenberg_CodePen_Embed
 * @since   2.0.0
 */
namespace Gutenberg_CodePen_Embed;

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue block JavaScript and CSS
 * 
 * @return void
 */
function blockScripts()
{

    $hash = 'f9fe718e69062281e705';
    $blockPath = "assets/js/index.$hash.js";

    // Enqueue the bundled block JS file
    if (file_exists(plugin_dir_path(__FILE__) . $blockPath)) {
        wp_enqueue_script(
            'codepen-embed-gutenberg-block-js',
            plugins_url($blockPath, __FILE__),
            array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ),
            filemtime(plugin_dir_path(__FILE__) . $blockPath),
            true
        );
    }

}

add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\\blockScripts');