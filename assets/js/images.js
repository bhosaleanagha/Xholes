import KH from './KH.png';
import KD from './KD.png';
import KS from './KS.png';
import QH from './QH.png';
import QD from './QD.png';
import QS from './QS.png';
import AH from './AH.png';
import AD from './AD.png';
import AS from './AS.png';
import JH from './JH.png';
import JD from './JD.png';


const images = [AH, KH, QH, JH, AS, KS, QS, AD, KD, QD, JD];
//const images = [{id:0, img:{KH} }]
const values = [1,0,12,11,1,0,12,1,0,12,1,0,12,11];

function loadImages() {

	return images;
}

function loadValues() {
	return values;
}

export default loadImages;
