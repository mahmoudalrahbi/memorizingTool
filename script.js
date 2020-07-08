CKEDITOR.replace('editor1');
CKEDITOR.replace('editor2');

$(document).ready(function () {

    var correctWords = "";
    var numberCorrectWords = 0;

    var isShown = true;



    var checkWords = function () {
        //when typing in editor1
        //     //console.log("TEST");

        //     //get text
        var text1 = CKEDITOR.instances.editor1.getData();

        //remove tages from text1
        var dom1 = document.createElement("DIV");
        dom1.innerHTML = text1;
        var plain_text1 = (dom1.textContent || dom1.innerText);
        //console.log(plain_text1);
        plain_text1 = plain_text1.slice(0, -1);

        var isWord = false;

        var length = plain_text1.length;

        var endSpace = /\s$/;

        if (endSpace.test(plain_text1)) {
            isWord = true;
            // console.log(" isWord =true;");
        } else {
            isWord = false;
            // console.log("isWord=false;");
        }

        plain_text1 = plain_text1.trim();

        if (plain_text1 != "" && isWord) {

            var typingWords = plain_text1.split(" ");

            var i = typingWords.length - 1;

            if (typingWords[i] === correctWords[i]) {
                console.log("correct");
            } else {
                console.log("wrong");
                var editor = CKEDITOR.instances.editor1;
                CKEDITOR.instances.editor1.removeListener('change', checkWords);
                var lastIndex = plain_text1.lastIndexOf(" ");
                plain_text1 = plain_text1.substring(0, lastIndex);
                console.log(plain_text1);

                CKEDITOR.instances.editor1.setData("", function () {
                    CKEDITOR.instances.editor1.focus();
                    CKEDITOR.instances.editor1.insertText(plain_text1 + " ");
                });



                // editor.startupFocus = 'end';            

                CKEDITOR.instances.editor1.on('change', checkWords);

            }
        }
    };









    CKEDITOR.instances.editor1.on('change', checkWords);

    $("button").click(function () {


        var text2 = CKEDITOR.instances.editor2.getData();





        //remove tages from text2
        var dom2 = document.createElement("DIV");
        dom2.innerHTML = text2;
        var plain_text2 = (dom2.textContent || dom2.innerText);

        //convert string to array get the number of words
        plain_text2 = plain_text2.trim();




        if (plain_text2 != "") {
            correctWords = plain_text2.split(" ");
            numberCorrectWords = correctWords.length;



            console.log('ddd');

            if (isShown) {
                document.getElementById("cke_" + "editor2").style.visibility = 'hidden';
                isShown = false;
            } else {
                document.getElementById("cke_" + "editor2").style.visibility = 'visible';
                isShown = true;
            }

        }

    });




    // $("editor1").change(function(){
    //     alert("The text has been changed.");
    //   });



});
