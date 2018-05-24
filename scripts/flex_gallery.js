"use strict";


function getScrollBarHeight(el) {
    return el.getBoundingClientRect().height - el.scrollHeight;
};

function getScrollBarWidth(el) {
    return el.getBoundingClientRect().width - el.scrollWidth;
};



class Thumb {

   constructor(ptype , src , dest , link , vertical) {
      
      this.thumb = ptype.cloneNode(true);

      if (vertical) {
         this.thumb.style.width = "100%";
      } else {
         this.thumb.style.height = "100%";
      }

      this.thumb.src = src;
      
      this.thumb.onclick = function () {
         dest.src = link;
      };
   }
   getImage() {return this.thumb;}
};



class Gallery {
   
   constructor(proto , thumb_div , image_div , image_list_file) {
      this.proto = proto;
      this.imagediv = undefined;
      this.thumbdiv = undefined;
      this.image_list_text = [];
      this.image_files_full = [];
      this.image_files_large = [];
      this.image_files_small = [];
      this.hthumbs = [];
      this.vthumbs = [];

      this.imagediv = image_div;
      this.thumbdiv = thumb_div;
      this.setImageList(image_list_file);
   }

   setImageList(path) {
      var xhttp = undefined;
      if (window.XMLHttpRequest) {
         xhttp = new XMLHttpRequest();
      }
      else {
         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      var self = this;
      xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var files = xhttp.responseText;
            self.image_list_text = files.split("\n");
            self.setupThumbnails();
         }
      };
      xhttp.open("GET" , path , true);
      xhttp.overrideMimeType("text/plain");
      xhttp.send();
   }
   
   setupThumbnails() {
      this.image_files_full = [];
      this.image_files_large = [];
      this.image_files_small = [];
      for (var i in this.image_list_text) {
         var text = this.image_list_text[i];
         console.log("Found " , text);
         if (text.indexOf("full") != -1) {
            this.image_files_full.push(text);
         }
         else if (text.indexOf("large") != -1) {
            this.image_files_large.push(text);
         }
         else if (text.indexOf("small") != -1) {
            this.image_files_small.push(text);
         }
      }
      
      for (var i in this.image_files_small) {
         var file = this.image_files_small[i];
         var lfile = this.image_files_large[i];
         let hthumb = new Thumb(this.proto , file , this.imagediv , lfile , false);
         let vthumb = new Thumb(this.proto , file , this.imagediv , lfile , true);
         this.hthumbs[i] = hthumb;
         this.vthumbs[i] = vthumb;
         this.thumbdiv.appendChild(hthumb.getImage());
      }
   }
};

