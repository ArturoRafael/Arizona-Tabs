    //Delete tab with icon
    $("html body").on("click",".nav-tabs li .tab-toggle.nav-link.show.active .bg-tab-icon",function(event){
        swal({
              title: "Are you sure?",
              text: "You want to close the tab and lose the current information?",
              type: "warning", 
              showCancelButton: true, 
              confirmButtonColor: "#DD6B55",   
              confirmButtonText: "Yes, close it!",   
              cancelButtonText: "No, cancel!"              
            })
            .then((willDelete) => {
              if (willDelete.dismiss != "cancel") {
                closeTabActive(); 
              } else {
                return false;
              }
          });
    });

    //Show tab edit payer
    $("html body").on( 'click', '.myTable.myTableDas.tablePayers tbody tr', function (event) {
        tabsDinamic('payers-editTab','editPayer','editPayer','Payer Detail');
    });   


    
    //Arrow effect for collapses
    $("html body").on('click', '.card .card-header.content-add-atributes' ,function(event){
        
        var nav = $(this);
        var href = $(nav).attr('href');
        if(!$(this).hasClass('collapsed')){
            $('.card .card-header.content-add-atributes[href="'+href+'"] .icon-collapse').addClass('ti-angle-up');
            $('.card .card-header.content-add-atributes[href="'+href+'"] .icon-collapse').removeClass('ti-angle-down');                
        }else{
            $('.card .card-header.content-add-atributes[href="'+href+'"] .icon-collapse').removeClass('ti-angle-up');
            $('.card .card-header.content-add-atributes[href="'+href+'"] .icon-collapse').addClass('ti-angle-down');
        }

    });
  

 
    //function to generate the tabs
    function tabsDinamic(namefile,id,href,nameTab){
       

        if(!$('.customtab').find("#"+id+'-tab').length)
        {

            $('.customtab').append('<li class="nav-item li-tab-toggle" href="#'+href+'"><a class="tab-toggle nav-link" id="'+id+'-tab" data-toggle="tab" href="#'+href+'" role="tab" aria-controls="'+href+'" aria-expanded="false"><span class="hidden-sm-up"><i class="mdi mdi-domain"></i></span><span class="hidden-xs-down">'+nameTab+' <i class="mdi mdi-close-circle-outline bg-tab-icon"></i></span></a></li>');

            $('.tab-content').append('<div role="tabpanel" class="tab-pane fade" id="'+href+'" aria-labelledby="'+id+'-tab"></div>');

            if(!$('#'+href).find("."+id).length){
                $.ajaxSetup({ cache: false });
                
                $("#"+href).load(namefile+".html", function(){
                    $(".custom_select").select2();
                    $('.selectpicker').selectpicker();
                    //Validations for Data tables

                    if ( ! $.fn.DataTable.isDataTable('.myTable') && $(".myTable").length > 0) {
                        $('.myTable').DataTable({
                            "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                            "order": [
                                [1, 'asc']
                            ],
                            "displayLength": 25,
                            "retrieve": true                
                        });
                        if($('.myTable').hasClass('myTableDas')){
                            filtback(href);
                        }
                    }
                    else{
                        if($(".myTable").length > 0 ){
                            $(".myTable").DataTable().destroy();
                            $('.myTable').DataTable({
                                "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                                "order": [
                                    [1, 'asc']
                                ],
                                "displayLength": 25,
                                "retrieve": true                 
                            });
                            if($('.myTable').hasClass('myTableDas')){
                                filtback(href);
                            }
                        }
                    }

                    
                    if ( ! $.fn.DataTable.isDataTable('.tableAddrow') && $(".tableAddrow").length > 0) {
                        $('.tableAddrow').DataTable({
                            "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                            "order": [
                                [1, 'asc']
                            ],
                            "displayLength": 10, 
                            "retrieve": true                
                        });

                    }
                    else{    
                        if($(".tableAddrow").length > 0){
                            $(".tableAddrow").DataTable().destroy();                        
                            $('.tableAddrow').DataTable({
                                "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                                "order": [
                                    [1, 'asc']
                                ],
                                "displayLength": 10,
                                "retrieve": true                 
                            });
                        }
                    }

                    
                    if(! $.fn.DataTable.isDataTable( '.myTableAddAtributes' ) && $(".myTableAddAtributes").length > 0) {
                        $('.myTableAddAtributes').DataTable({
                            "dom": '<<"contentSearch"f><t>p>',
                            "order": [
                                [1, 'asc']
                            ],                
                            "lengthMenu": [[5, 10], [5, 10]],
                            "displayLength": 5,
                            "retrieve": true                
                        });
                    }
                    else{
                        if($(".myTableAddAtributes").length > 0){
                            $(".myTableAddAtributes").DataTable().destroy();
                            $('.myTableAddAtributes').DataTable({
                                "dom": '<<"contentSearch"f><t>p>',
                                "order": [
                                    [1, 'asc']
                                ],                
                                "lengthMenu": [[5, 10], [5, 10]],
                                "displayLength": 5,
                                "retrieve": true                
                            });
                        }
                    }


                    if ( ! $.fn.DataTable.isDataTable('.tableDasGroup') && $(".tableDasGroup").length > 0 ) {
                        $('.tableDasGroup').DataTable({
                                "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                                "columnDefs": [{
                                    "visible": false,
                                    "targets": 2
                                }],
                                "order": [
                                    [1, 'asc']
                                ],
                                "displayLength": 25, 
                                "retrieve": true,
                                "drawCallback": function(settings) {
                                    var api = this.api();
                                    var rows = api.rows({
                                        page: 'current'
                                    }).nodes();
                                    var last = null;
                                    api.column(2, {
                                        page: 'current'
                                    }).data().each(function(group, i) {
                                        if (last !== group) {
                                            $(rows).eq(i).before('<tr class="group"><td colspan="4">' + group + '</td></tr>');
                                            last = group;
                                        }
                                    });
                                }                
                            }); 
                            
                        filtback(href);
                    }
                    else{
                        if($(".tableDasGroup").length > 0){
                            $(".tableDasGroup").DataTable().destroy();
                            $('.tableDasGroup').DataTable({
                                    "dom": '<<"contentSearch"f><t>lp<"contentInfo"i>>',
                                    "columnDefs": [{
                                        "visible": false,
                                        "targets": 2
                                    }],
                                    "order": [
                                        [1, 'asc']
                                    ],
                                    "displayLength": 25, 
                                    "retrieve": true,
                                    "drawCallback": function(settings) {
                                        var api = this.api();
                                        var rows = api.rows({
                                            page: 'current'
                                        }).nodes();
                                        var last = null;
                                        api.column(2, {
                                            page: 'current'
                                        }).data().each(function(group, i) {
                                            if (last !== group) {
                                                $(rows).eq(i).before('<tr class="group"><td colspan="4">' + group + '</td></tr>');
                                                last = group;
                                            }
                                        });
                                    }                                                  
                                }); 

                            filtback(href);
                        }
                    }
                    
                    
 
                });

                
            }
            $('.nav-tabs a[href="#'+href+'"]').tab('show');
        }else{
            //Confirmation alert on tab already opened
            swal({
              title: "Are you sure?",
              text: "Is the tab "+nameTab+" already created. Do you want to close the current one and open a new one?",
              type: "warning", 
              showCancelButton: true, 
              confirmButtonColor: "#DD6B55",   
              confirmButtonText: "Yes, sure it!",   
              cancelButtonText: "No, Open tab: "+nameTab              
            })
            .then((willDelete) => {
              if (willDelete.dismiss != "cancel") {
                var nav = $('#'+id+'-tab');
                var hrf = $(nav).attr('href');
                var tabs = $('.tab-toggle').length;
                nav.add($(nav).attr('href')).remove();
                $('li[href="'+hrf+'"]').remove(); 
                tabsDinamic(namefile,id,href,nameTab);
              } else {
                $('.nav-tabs a[href="#'+href+'"]').tab('show');
              }
          });

        }
        
    }

    //Various functions used for effects and show or hide tables
    
    function showTable(content){
        $("."+content+" .afterfilt").fadeIn(500);
    }
    
    function filtback(content){
        $("."+content+" .afterfilt").fadeOut(500);
        $("."+content+" .beforetable").fadeIn(1000);        
    }
    
    function change(){
        var pdrs = document.getElementById('file-upload').files[0].name;
        document.getElementById('info').innerHTML = pdrs;
        $('.btnSaveFile').css("display","block");
    }

    function getQueryVariable(variable) {
        var query =  window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("="); 
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

    function GenerateKey(){
        if($("#name-first").val().length == 0){
            $("#name-first").focus();
            return false;
        }else if($("#name-last").val().length == 0){
            $("#name-last").focus();
            return false;                
        }else if($("#email").val().length == 0){
            $("#email").focus();
            return false;
        }else if($("#role").val().length == 0){
            $("#role").focus();
            return false;
        }else{
            $('.showMjsCreate').show();
            $('#newmodal').modal('toggle');
            return false;
        }
        return false;
    }

    function associate(content){
        $('.'+content+' .text-no-benefit').css("display","none");
        $('.'+content+' .tb-myTable').css("display","block");

    }

    function changeExpire( chek, id){
        
        if( $('#'+chek).is(':checked') ) {
            $('#'+id).removeAttr('disabled');
        }else{
            $('#'+id).attr('disabled','disabled');
        }
    }

    function closeTabActive(){

        var nav = $('.tab-toggle.active');
        var href = $(nav).attr('href');
        var tabs = $('.tab-toggle').length;
        nav.add($(nav).attr('href')).remove();
        $('li[href="'+href+'"]').remove();
        $('.nav-tabs a:last').tab('show');
        /*
        var itemNav = $('.nav-tabs li .tab-toggle.nav-link.show.active').attr('href');
        var item = itemNav.replace("#", "");
            
        $("#sidebarnav li a").each(function(){
            if($(this).hasClass("nav-active")){
                $(this).removeClass("nav-active");
            }
        });

        $('#sidebarnav li[data-id="'+item+'"] a').addClass("nav-active"); */
    }
