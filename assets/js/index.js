$( document ).ready(function() {

    var Clearfix = {};

    Clearfix.App = function() {

        this.btnShare = $('.btn-share');
        this.blogLogo = $('.blog-logo');
        this.mobileMenu = $('.mobile-menu select');
        this.coverImage = $('.post-cover');

        this.init = function()
        {
            $('body').fadeIn(500, function() {});

            this.blogLogo.addClass('animated bounceInDown visible');
            this.blogLogo.removeClass('hiding');

            this.coverImage.addClass('animated fadeIn visible');
            this.coverImage.removeClass('hiding');

            $('.animated').appear();

            $(document.body).on('appear', '.animated', function (e, $affected) {
                var element = $(this);
                var animation = element.data('animation');

                element.addClass(animation + ' visible');
                element.removeClass('hiding');
            });

        }

        this.btnShare.on('click', function(e) {
            e.preventDefault();

            var url = $(this).attr('href');
            var width = $(this).data('width');
            var height = $(this).data('height');

            window.open(url, 'Podziel się', 'width=' + width + ',height=' + height);
        });

        this.mobileMenu.on('change', function() {
            window.location = $(this).find('option:selected').val();
        });
    };

    Clearfix = new Clearfix.App();
    Clearfix.init();

});