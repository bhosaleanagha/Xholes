import AH from './KH.png';
import AD from './KD.png';
import AS from './KS.png';
import AC from './KC.png';
import BH from './AH.png';
import BD from './AD.png';
import BS from './AS.png';
import BC from './AC.png';
import CH from './2H.png';
import CD from './2D.png';
import CS from './2S.png';
import CC from './2C.png';
import DH from './3H.png';
import DD from './3D.png';
import DS from './3S.png';
import DC from './3C.png';
import EH from './4H.png';
import ED from './4D.png';
import ES from './4S.png';
import EC from './4C.png';
import FH from './5H.png';
import FD from './5D.png';
import FS from './5S.png';
import FC from './5C.png';
import GH from './6H.png';
import GD from './6D.png';
import GS from './6S.png';
import GC from './6C.png';
import HH from './7H.png';
import HD from './7D.png';
import HS from './7S.png';
import HC from './7C.png';
import IH from './8H.png';
import ID from './8D.png';
import IS from './8S.png';
import IC from './8C.png';
import JH from './9H.png';
import JD from './9D.png';
import JC from './9C.png';
import JS from './9S.png';
import KH from './TH.png';
import KD from './TD.png';
import KC from './TC.png';
import KS from './TS.png';
import LH from './JH.png';
import LD from './JD.png';
import LC from './JC.png';
import LS from './JS.png';
import MH from './QH.png';
import MD from './QD.png';
import MS from './QS.png';
import MC from './QC.png';
import WC from './WC.png';
import CV from './CV2.png';
import MT from './MT.png';

const images = [AH,AD,AS,AC,BH,BD,BS,BC,CH,CD,CS,CC,DH,DD,DS,DC,EH,ED,ES,EC,FH,FD,FS,FC,GH,GD,GS,GC,HH,HD,HS,HC,IH,ID,IS,IC,JH,JD,JS,JC,KH,KD,KS,KC,LH,LD,LS,LC,MH,MD,MS,MC,WC,CV,MT];
//const images = [{id:0, img:{KH} }]
const values = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,-5];

function loadImages() {

	return images;
}

function loadValues() {
	return values;
}

export default loadImages;
