var MOUSE_X = 0, MOUSE_Y = 0;

$(document).ready( function(){
  var is_mobile = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))is_mobile = true})(navigator.userAgent||navigator.vendor||window.opera);

  var avatar = $('#avatar');

  if (is_mobile) {
    avatar.attr('src', 'img/myavatar_eyes.png');
  } else {
    update_eyes(0,0);

    $(window).scroll(function() { //when window is scrolled
      update_eyes(MOUSE_X, MOUSE_Y);
    });

    $(document).mousemove(function(e){

      var eyes = $('#circle');
      var avatar = $('#avatar');
      var offset = avatar.offset();

      update_eyes(e.pageX, e.pageY);
      MOUSE_X=e.pageX
      MOUSE_Y=e.pageY;
    });
  }
});




function update_eyes(mouseX, mouseY) {
	update_eye(mouseX, mouseY, '#left_eye', 208);
	update_eye(mouseX, mouseY, '#right_eye', 300);
}

function update_eye(mouseX, mouseY, selecter, ratioX) {

	var eyes = $(selecter);
	var avatar = $('#avatar');
	var offset = avatar.offset();

	eyes.css('height', avatar.height()*0.04);
	eyes.css('width', avatar.height()*0.04);


	var x = offset.left + avatar.width() * (ratioX/500.);
	var y = offset.top - $(window).scrollTop() + avatar.height() * (210/500.);

	mouseY -= $(window).scrollTop();

	var slope = (mouseY-y)/(mouseX-x);
	var c = 1/Math.sqrt(1+Math.pow(slope,2));
	var s = -Math.abs(slope/Math.sqrt(1+Math.pow(slope,2)));

	var distance = 4-parseInt(eyes.css('height'))/2;

	var changeX = (mouseX > x) ? -1 : 1;
	var changeY = (mouseY > y) ? 1 : -1;

	var centerX = x + changeX * distance*c;
	var centerY = y + changeY * distance*s;


	var results = origin_for_center(eyes, centerX, centerY);
	eyes.css('left', results[0] + 'px');
	eyes.css('top', results[1] + 'px');
}

function update_eye2(mouseX, mouseY) {

	var eyes = $('#right_eye');
	var avatar = $('#avatar');
	var offset = avatar.offset();

	eyes.css('height', avatar.height()*0.04);
	eyes.css('width', avatar.height()*0.04);


	var x = offset.left + avatar.width() * (300/500.);
  	var y = offset.top - $(window).scrollTop() + avatar.height() * (210/500.);

  	mouseY -= $(window).scrollTop();

  	var slope = (mouseY-y)/(mouseX-x);
  	var c = 1/Math.sqrt(1+Math.pow(slope,2));
  	var s = -Math.abs(slope/Math.sqrt(1+Math.pow(slope,2)));

  	var distance = 4-parseInt(eyes.css('height'))/2;

  	var changeX = (mouseX > x) ? -1 : 1;
  	var changeY = (mouseY > y) ? 1 : -1;

  	var centerX = x + changeX * distance*c;
  	var centerY = y + changeY * distance*s;

  	var results = origin_for_center(eyes, centerX, centerY);
  	eyes.css('left', results[0] + 'px');
  	eyes.css('top', results[1] + 'px');
}

function origin_for_center(el, x, y) {
	return [x-el.width()/2., y-el.height()/2.];
}