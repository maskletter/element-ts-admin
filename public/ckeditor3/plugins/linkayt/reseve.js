﻿var Adrs="",AdrsDeb=0,AdrsFin=0,Attente=!1,DernQuatre=[],Travail="",CKcontenu=CKEDITOR.replace("contenu",{toolbar:"Reduite",filebrowserImageBrowseUrl:"outils/ckeditor_ChoisirImage.php",filebrowserImageUploadUrl:"outils/ckeditor_RecevoirImage.php"}),MonEditeur=CKEDITOR.instances.text_Messagerie;
MonEditeur.on("contentDom",function(){MonEditeur.document.on("keydown",function(a){DernQuatre.push(a.data.getKeystroke());if(3<DernQuatre.length&&(4<DernQuatre.length&&DernQuatre.shift(),"72"==DernQuatre[0]&&"84"==DernQuatre[1]&&"84"==DernQuatre[2]&&"80"==DernQuatre[3]&&(Travail=MonEditeur.getData(),AdrsDeb=Travail.length-4,Travail="",Attente=!0),32==a.data.getKeystroke()&&1==Attente)){Attente=!1;Travail=MonEditeur.getData();AdrsFin=Travail.length;Adrs=Travail.substring(AdrsDeb,AdrsFin);Adrs=Adrs.trim();
Travail="";a=Adrs;if("http://plongee.ca"==Adrs.substr(0,17)||"https://plongee.ca"==Adrs.substr(0,18))Adrs=17==Adrs.length||18==Adrs.length||"http://plongee.ca/"==Adrs||"https://plongee.ca/"==Adrs?"index.php":"http:"==Adrs.substr(0,5)?Adrs.substr(18):Adrs.substr(19),a="Plongée ca!";MonEditeur.insertHtml('\x26nbsp; (\x3ca href\x3d"'+Adrs+'"\x3e'+a+"\x3c/a\x3e) ")}});MonEditeur.document.on("keyup",function(a){1114125==a.data.getKeystroke()&&SoumettreMessage()})});