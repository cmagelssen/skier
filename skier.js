const height = 500;
const width = 800;
const skierIconSvg = 'skier.svg';
const gate =
	'https://docs.google.com/drawings/d/e/2PACX-1vReBMnm0oMHA-DuF_s6ds4irdAl_Y_zSbW3rO3DzG6u2Gmp2_ta2tFXO-poCOm7wXx02Dzd2EsT0c13/pub?w=186&h=290';
const finish =
	'https://docs.google.com/drawings/d/e/2PACX-1vTWOmvwPIu2MrEbZAla5m2N5CcPVsPSEKHeKBI0sZsF9wKkMhZosnOmgMo1WHTnnAPA9i5LV0p0LR_r/pub?w=186&h=290';

const [p1, p2, p3] = [
	[80, 100],
	[750, 230],
	[750, 230],
];

const svg = d3.select('svg');

// Store a reference to the span we're going to update
const skierHeight = d3.select('#skier-height');

const vek = document.querySelector('#vekt');
console.log(vek.value);

const line = svg.append('line').attr('stroke', 'black');

const connection = svg.append('line').attr('stroke', 'green');

const marker = svg
	.append('circle')
	.attr('r', 5)
	.attr('stroke', 'red')
	.attr('fill', 'none');

const g = svg
	.append('g')
	.attr('cursor', 'move')
	.attr('pointer-events', 'all')
	.attr('stroke', 'transparent')
	.attr('stroke-width', 30);

const start = g
	.append('image')
	.attr('id', 'sdjjjjj')
	.datum(p1)
	.attr('href', gate)
	.attr('width', 100)
	.attr('height', 100)
	.call(
		d3
			.drag()
			.subject(([x, y]) => ({
				x,
				y,
			}))
			.on('drag', dragged)
	);

const mal = g
	.append('image')
	.attr('id', 'sdjj')
	.datum(p2)
	.attr('href', finish)
	.attr('width', 100)
	.attr('height', 100)
	.attr('transform', 'translate(710, 140)')
	.call(
		d3
			.drag()
			.subject(([x, y]) => ({
				x,
				y,
			}))
			.on('drag', dragged)
	);

const skier = g
	.append('image')
	.attr('id', 'skier')
	.datum(p3)
	.attr('href', skierIconSvg)
	.attr('width', 100)
	.attr('height', 100)
	.attr('transform', 'translate(-50, -70)')
	.call(
		d3
			.drag()
			.subject(([x, y]) => ({
				x,
				y,
			}))
			.on('drag', dragged)
			.on('end', dropSkier)
	);

update();

function dragged(d) {
	d[0] = d3.event.x;
	d[1] = d3.event.y;
	update();
	potensiellEnergi();

	connection.interrupt();
}

function update() {
	const t = (width + height) / distance(p1, p2);

	const l1 = interpolate(p1, p2, t);

	const l2 = interpolate(p2, p1, t);
	const p = interpolate(p1, p2, project(p1, p2, p3));

	connection.attr('x1', p3[0]).attr('y1', p3[1]);
	connection.attr('x2', p[0]).attr('y2', p[1]);
	marker.attr('cx', p[0]).attr('cy', p[1]);
	line.attr('x1', l1[0]).attr('y1', l1[1]);
	line.attr('x2', l2[0]).attr('y2', l2[1]);
	start.attr('cx', (d) => d[0]).attr('cy', (d) => d[1]);
	skier.attr('x', (d) => d[0]).attr('y', (d) => d[1]);
	mal.attr('cx', (d) => d[0]).attr('cy', (d) => d[1]);

	skierHeight.text(`${getHeight(p, p1, p2).toFixed(2)} meter`);
}
function distance([x1, y1], [x2, y2]) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function interpolate([x1, y1], [x2, y2], t) {
	return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}

function project([x1, y1], [x2, y2], [x3, y3]) {
	const x21 = x2 - x1,
		y21 = y2 - y1;
	const x31 = x3 - x1,
		y31 = y3 - y1;
	return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
}

function getHeight([xp, yp], [x1, y1], [x2, y2]) {
	// Note that y is counted from top to bottom, so higher y means
	// a point is actually lower.

	// First, the total height is 100 metres.
	const pxPerMeter = (y2 - y1) / 100;

	// Calculate the height diff in pixels
	const heightDiffPx = y2 - yp;

	// Now transform it to meters
	return heightDiffPx / pxPerMeter;
}

function vektVelger() {
	const vektVerdi = document.querySelector('#vekt');
	const vektDisplay = document.querySelector('#skier-vekt');

	vektDisplay.innerHTML = vektVerdi.value;
}

function potensiellEnergi() {
	const vektVerdi = parseInt(document.querySelector('#skier-vekt').textContent);
	const skierHeight = parseInt(
		document.querySelector('#skier-height').textContent
	);
	const hastighet = document.querySelector('#skier-hastighet');
	const potEDisplay = document.querySelector('#skier-potentialenergi');
	const potEnergi = `${vektVerdi * skierHeight * 9.8}`;
	const hastighetsutregning = Math.sqrt(2 * (skierHeight * 9.8));
	return (hastighet.innerHTML = `${hastighetsutregning}`);
	return (potEDisplay.innerHTML = `${potEnergi}`);
}

function dropSkier(d) {
	const projection = interpolate(p1, p2, project(p1, p2, p3));
	skier
		.transition()
		.duration(500)
		// First down to the ground
		.attr('x', projection[0])
		.attr('y', projection[1])
		.on('end', () => {
			skier
				.transition()
				.duration(2500)
				// First down to the ground
				.attr('x', p2[0])
				.attr('y', p2[1]);
		});

	// Remove the line together with the skier
	connection
		.transition()
		.duration(500)
		// First down to the ground
		.attr('x1', projection[0])
		.attr('y1', projection[1]);

	marker.transition().duration(800).remove();
}
