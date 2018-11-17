// Get Pen ID from CodePen URL
export default function getPenID( penURL ) {
	let matches_array = penURL.match(/http[s]?:\/\/codepen\.io\/[^\/]+\/[pen|details|full|pres]+\/([a-zA-Z]{6})/);
	return ( Array.isArray( matches_array ) ) ? matches_array[1] : null;
}