$(document).ready(function(){
	var animationLength = 200,
		rollDiceAnimationLength = 250;
	
	//	Set the rolling timing
	$("#dice").css({
		'-webkit-animation-duration': rollDiceAnimationLength + 'ms',
		'-moz-animation-duration': rollDiceAnimationLength + 'ms',
		'-o-animation-duration': rollDiceAnimationLength + 'ms',
		'animation-duration': rollDiceAnimationLength + 'ms'
	});
	
	//	Dice Roll Actions
	$('#roll-dice').on('click', function(){
		//	Business logic goes here. Here are demonstrated results with random numbers
		var rnd = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		$("#dice").removeClass('result-1 result-2 result-3 result-4 result-5 result-6 init');
		$("#dice").replaceWith($("#dice").clone(true));
		$("#dice").addClass('result-' + rnd);
		
		//	Enable/Disable Roll Button click
		$('#roll-dice').prop('disabled', true);
		function btnEnable(btn){
			btn.prop('disabled', false);
		}
		setTimeout(function(){
			btnEnable($('#roll-dice'));
			$('#dice').trigger('click');
		}, rollDiceAnimationLength);
	});
	
	function containerResize(){
		var diceWrapperHeight = $('.dice-wrapper').height(),
			diceSize = parseInt(diceWrapperHeight / 2),
			diceSideSize = diceSize / 2,
			i;
		
		function theTransform($elem, rotation){
			var translationOuter = 'translateZ(' + (diceSideSize + 0) + 'px)',
				translationInner = 'translateZ(' + (diceSideSize - 2) + 'px)',
				transformPrefix = [
					'-webkit-transform',
					'-moz-transform',
					'-ms-transform',
					'transform',
				];
			
			for(i=0; i<transformPrefix.length; i++){
				$elem.css(transformPrefix[i], rotation + ' ' + translationOuter);
				$elem.next('.inner').css(transformPrefix[i], rotation + ' ' + translationInner);
			}
		}
		
		$('#dice').css({
			'width': diceSize,
			'height': diceSize,
			'marginTop': -(diceSize/2),
			'marginLeft': -(diceSize/2)
		});
		theTransform($('.side1'), 'rotateX(0deg)');
		theTransform($('.side2'), 'rotateX(-90deg)');
		theTransform($('.side3'), 'rotateY(90deg)');
		theTransform($('.side4'), 'rotateY(-90deg)');
		theTransform($('.side5'), 'rotateX(90deg)');
		theTransform($('.side6'), 'rotateX(180deg)');
	}
	
	containerResize();
	$(window).resize(containerResize);
});