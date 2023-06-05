import 'normalize.css';
import './style/index.scss';
import GameControl from './js/GameControl';

const testButtonElement: HTMLElement = document.getElementById('test')!;
testButtonElement?.addEventListener('click', function() {
}, false);

new GameControl();
