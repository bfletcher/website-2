$(window).on('load', function () {

    if ($('#product-filters .dropdown-menu a').hasClass('mixitup-control-active')) {
        $(this).closest("button").addClass("mixitup-control-active");
    }
    
    if($(".owl-carousel").length){
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }
    if ($('.mixitup-container').length) {
        var mixer = mixitup('.mixitup-container', {
            selectors: {
                target: '.product-item',
                control: '[data-mixitup-control]'
            },
            animation: {
                effects: 'fade translateZ(-100px)',
                duration: 300
            },
            load: {
                sort: 'date-added:descending'
            }
        });
        $filterSelect = $('.filter-select');
        $container = $('.mixitup-container');
        $filterSelect.on('change', function () {
            mixer.filter(this.value);
        });
    }
    if($(".compare-boards-btn").length){
        $('[data-toggle="tooltip"]').tooltip();
        var selectedBoards = [];
        var selectedBoardsTitles = [];
        $(".board-checkbox").change(function () {
            var boardUid = $(this).data("board");
            var boardTitle = $(this).data("board-title");
            if (this.checked) {
                if ($.inArray(boardUid, selectedBoards) === -1){
                    selectedBoards.push(boardUid);
                    selectedBoardsTitles.push(boardTitle);
                }
            }
            else{
                if ($.inArray(boardUid, selectedBoards) != -1) {
                    selectedBoards.splice($.inArray(boardUid, selectedBoards), 1);
                    selectedBoardsTitles.splice($.inArray(boardTitle, selectedBoards), 1);
                }
            }
        });
        function compareBoards(selectedBoards, selectedBoardsTitles){
            // Url to add to compare button
            var compareBoardsUrl = "/products/compare/?boards=";
            // Empty the board list
            $(".boards-to-compare").empty();
            $(".boards-to-compare").append("No 96Boards currently selected!");
            if (selectedBoards.length > 0) {
                $(".boards-to-compare").empty();
                // Add the selected boards to the url
                $.each(selectedBoards, function (index, value) {
                    var isLastElement = index == selectedBoards.length - 1;
                    if (isLastElement) {
                        compareBoardsUrl = compareBoardsUrl + value;
                    }
                    else {
                        compareBoardsUrl = compareBoardsUrl + value + ",";
                    }
                });
                $.each(selectedBoardsTitles, function (index, value) {
                    $(".boards-to-compare").append("<li class='list-group-item'>" + value + "</li>");
                });
                // Set the Get params for the compare boards button in the modal
                $("#compare-btn").attr("href", compareBoardsUrl);
            }
            // Toggle the modal
            $("#compare-boards-modal").modal("show");
        }
        $(".compare-boards-btn").on("click", function(){
        compareBoards(selectedBoards, selectedBoardsTitles);
        });
    }
});
