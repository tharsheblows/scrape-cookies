const form = `<div class="wrapper">
	<form id="cookie-form">
		<input type="text" />
		<button type="submit">Submit</button>
	</form>

	<div id="results"></div></div>
`;

const formString = form.replace(/  |\r\n|\n|\r|\t/gm, '');

module.exports = {
	form: formString
}