import "./BoxSx.css";
import slideOne from './slideOne.jpg';
import slideTwo from './slideTwo.jpg';
import slideThree from './slideThree.jpg';
import slideFour from './slideFour.jpg';

export default function BoxSx() {

  window.onload = function() {
      var counter = 1;
      setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++
        if(counter > 4){
          counter = 1;
        }
      }, 5000);
  }

  return (
    <div>           
      <div className="slider">
          <div className="slides">
              <input type="radio" name="radio-btn" id="radio1"/>
              <input type="radio" name="radio-btn" id="radio2"/>
              <input type="radio" name="radio-btn" id="radio3"/>
              <input type="radio" name="radio-btn" id="radio4"/>

              <div className="slide first">
                  <img src={slideOne} alt=""/>
              </div>
              <div className="slide">
                  <img src={slideTwo} alt=""/>
              </div>
              <div className="slide">
                  <img src={slideThree} alt=""/>
              </div>
              <div className="slide">
                  <img src={slideFour} alt=""/>
              </div>
              <div className="navigation-auto">
                  <div className="auto-btn1"></div>
                  <div className="auto-btn2"></div>
                  <div className="auto-btn3"></div>
                  <div className="auto-btn4"></div>
                  
              </div>   
          </div>
          <div className="navigation-manual">
              <label htmlFor="radio1" className="manual-btn"/> 
              <label htmlFor="radio2" className="manual-btn"/> 
              <label htmlFor="radio3" className="manual-btn"/> 
              <label htmlFor="radio4" className="manual-btn"/>
          </div>   
      </div>
    </div>
  );
}
