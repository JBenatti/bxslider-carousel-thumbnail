var $j=jQuery.noConflict();

$j("document").ready(function(){
    sliderHandler();
});
    function sliderHandler(){
        var homeSlider=$j('#sliderBuilder').bxSlider({
            pager:false,
            controls:false,
            auto:true,
            pause:6000,
            speed:1000,
            mode:"fade",
            onSlideAfter:function($slideElement,oldIndex,newIndex){
                $j("#sliderBuilder li.active").removeClass("active");
                $slideElement.addClass("active");
            },
            onSliderLoad:function(){
                $j('#sliderBuilder li').first().addClass("active");
            }
        });
        if($j("#sliderHomeControls").length>0){
            $j("#sliderHomeControls").on("click","a",function(event){
                event.preventDefault();
                var $this=$j(this);
                if($this.hasClass("lSlider")){
                    homeSlider.goToPrevSlide();
                    homeSlider.stopAuto();
                    homeSlider.startAuto();
                }else{
                    homeSlider.goToNextSlide();
                    homeSlider.stopAuto();
                    homeSlider.startAuto();
                }
                return false;
            });
        }
        if($j("#sliderBigReal").length>0){
            var realSlider=$j("#sliderBigReal ul").bxSlider({
                speed:1000,
                pager:false,
                nextText:'',
                prevText:'',
                infiniteLoop:false,
                hideControlOnEnd:true,
                onSlideBefore:function($slideElement,oldIndex,newIndex){
                    changeRealThumb(realThumbSlider,newIndex);
                }
            });
            var realThumbSlider=$j("#sliderThumbReal ul").bxSlider({
                minSlides:4,
                maxSlides:4,
                slideWidth:156,
                slideMargin:12,
                moveSlides:1,
                pager:false,
                speed:1000,
                infiniteLoop:false,
                hideControlOnEnd:true,
                nextText:'<span></span>',
                prevText:'<span></span>',
                onSlideBefore:function($slideElement,oldIndex,newIndex){

                }
            });
            linkRealSliders(realSlider,realThumbSlider);
            if($j("#sliderThumbReal li").length<5){
                $j("#sliderThumbReal .bx-next").hide();
            }
        }
    }
function linkRealSliders(bigS,thumbS){
    $j("#sliderThumbReal ul").on("click","a",function(event){
        event.preventDefault();
        newIndex=$j(this).parent().attr("slideIndex");
        bigS.goToSlide(newIndex);
    });
}

function changeRealThumb(slider,newIndex){
    var $thumbS=$j("#sliderThumbReal");
    $thumbS.find('.active').removeClass("active");
    $thumbS.find('li[slideIndex="'+newIndex+'"]').addClass("active");
    if(
        slider.getSlideCount()-newIndex>=4
    )
        slider.goToSlide(newIndex);
    else slider.goToSlide(
        slider.getSlideCount()-4);
}