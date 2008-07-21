/*
    Translate - Firefox Extension that facilitates the translation of text and/or webpages
    Copyright (C) 2007  Paul Grave

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
	
	
*/

const PGTRANSLATE_QUICKTRANSLATIONSITE = "http://translate.google.com/translate_c?u=";
const PGTRANSLATE_TRANSLATIONSITE = "http://babelfish.altavista.com/babelfish/trurl_pagecontent?";
const PGTRANSLATE_SELECTIONSITE = "http://babelfish.altavista.com/babelfish/tr?"
const PGTRANSLATE_FIRSTARG = "url";
const PGTRANSLATE_SELECTFIRSTARG = "urltext";
const PGTRANSLATE_SECONDARG = "lp";
const PGTRANSLATE_EQUALS = "=";
const PGTRANSLATE_AMP = "&";

String.prototype.trim = function() {
  var x=this;
  x=x.replace(/^\s*(.*)/, "$1");
  x=x.replace(/(.*?)\s*$/, "$1");
  return x;
}

// Contructor to set up some variables and preferences
function PGTranslate() { // lets initialise some of the variables that we are going to use
	this.translateBundle;  //holds variable found in translate.properties
	this.PGTranslate_prefs = new PGTranslate_prefs();		
	this.myListener = {          //listens for page refreshs, if the page refreshed is an image then translate is disabled
		onStateChange:function(aProgress,aRequest,aFlag,aStatus) {
			//gPGTranslate.detectLang(aFlag);	
		},
		onLocationChange:function(aProgress,aRequest,aLocation) {
			gPGTranslate.enableTranslate(aLocation.asciiSpec);
		},
		onProgressChange:function(a,b,c,d,e,f){},
		onStatusChange:function(a,b,c,d) {},
		onSecurityChange:function(a,b,c){},
		onLinkIconAvailable:function(a){}
	}	
	this.initPref(this.PGTranslate_prefs.PREF_CONTEXTMENU_ENABLED , "bool", true);
    	this.initPref(this.PGTranslate_prefs.PREF_TOOLMENU_ENABLED , "bool", true);
	this.initPref(this.PGTranslate_prefs.PREF_LANGUAGE , "int", 0);
}
   
// Method to initalise preferences                  
PGTranslate.prototype.initPref = function (aPrefName, aPrefType, aDefaultValue) {
  switch (aPrefType) {
    case "bool" :
      var prefExists = this.PGTranslate_prefs.getBoolPref(aPrefName);
      if (prefExists == null)
        this.PGTranslate_prefs.setBoolPref(aPrefName, aDefaultValue);
      break;

    case "int" :
      var prefExists = this.PGTranslate_prefs.getIntPref(aPrefName);
      if (prefExists == null)
        this.PGTranslate_prefs.setIntPref(aPrefName, aDefaultValue);
      break;

    case "char" :
      var prefExists = this.PGTranslate_prefs.getCharPref(aPrefName);
      if (prefExists == null)
        this.PGTranslate_prefs.setCharPref(aPrefName, aDefaultValue);
      break;
  }
}

//  Sets up listeners (progress and context menu)
//  Gets string bundle
//  Initalises the menus
PGTranslate.prototype.onLoad = function() {
	const NOTIFY_ALL =  Components.interfaces.nsIWebProgress.NOTIFY_ALL;
	window.getBrowser().addProgressListener(gPGTranslate.myListener , NOTIFY_ALL);
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing",gPGTranslate.onTranslatePopup,false);
	
	// get the variables stored in translate.properties
	gPGTranslate.translateBundle = document.getElementById("bundle-translate");
	if (! gPGTranslate.translateBundle) {
		alert("no bundle");  // alert if tranlate.properties is invalid
	}
	gPGTranslate.initMenus();
}

// This method is excuted after each page refresh
// Checks to see if the document ins't html, if so, diasbales the translate button
PGTranslate.prototype.enableTranslate  = function (aUri) {
	if(aUri != null) {
		var ext = aUri.toLowerCase();
		ext = ext.split(".");	
		var toolbarItem = document.getElementById("translate-pg");
		var toolbarMenu = document.getElementById("translate-pg-menu");
		var disableItem ;
	
		if( ext == null) {
			disableItem = false;
		} else if ( ext[ext.length-1] == "gif" || ext[ext.length-1] == "png" || ext[ext.length-1] == "jpg") {
			disableItem = true;
		} else {
			disableItem = false;
		}
		
		if(toolbarItem != null)
			toolbarItem.disabled = disableItem;
		
		if(toolbarMenu != null)
			toolbarMenu.disabled = disableItem;	
	}
}

PGTranslate.prototype.quickTranslate = function () {
	if(gPGTranslate.PGTranslate_prefs.getIntPref(gPGTranslate.PGTranslate_prefs.PREF_LANGUAGE) == 0) {
		gPGTranslate.quick_translate();
	} else {
		gPGTranslate.translateFrom("en_" + PGTRANSLATE_LANGUAGEPAIRS[gPGTranslate.PGTranslate_prefs.getIntPref(gPGTranslate.PGTranslate_prefs.PREF_LANGUAGE)][0]);
	}
}

PGTranslate.prototype.fillToolbutton = function () {	
	language = PGTRANSLATE_LANGUAGEPAIRS[gPGTranslate.PGTranslate_prefs.getIntPref(gPGTranslate.PGTranslate_prefs.PREF_LANGUAGE)][0];
	toolbarMenuPopup = document.getElementById("translate-toolbutton-menupopup");
	toolbarMenuPopup.setAttribute("class","toolbar-options-" + language);
}

PGTranslate.prototype.openPrefs = function() {
	window.openDialog("chrome://translate/content/translate-preferences.xul", "_blank", "chrome,resizable=no,dependent=yes");
}

PGTranslate.prototype.initMenus = function() { //initialises the context menu and the toolbar menu
	var toolbarItem = document.getElementById("translate-pg");
	var tool = document.getElementById("translate-pg-menu");

	// 1. Hide/Show the tool menu
//	tool.hidden = !gPGTranslate.PGTranslate_prefs.getBoolPref(gPGTranslate.PGTranslate_prefs.PREF_TOOLMENU_ENABLED);
//	tool.collapsed = !gPGTranslate.PGTranslate_prefs.getBoolPref(gPGTranslate.PGTranslate_prefs.PREF_TOOLMENU_ENABLED);
	
	//2. setup contextMenu
	language = PGTRANSLATE_LANGUAGEPAIRS[gPGTranslate.PGTranslate_prefs.getIntPref(gPGTranslate.PGTranslate_prefs.PREF_LANGUAGE)][0];
	contextMenuPopup = document.getElementById("contextOptions");
	
	if(contextMenuPopup)
		contextMenuPopup.setAttribute("class","context-options-" + language);
		
	// 3. setup toolsMenu
	//toolsMenuPopup = document.getElementById("translate-toolsmenu-menupopup");
	//toolsMenuPopup.setAttribute("class","toolsmenu-options-" + language);

	// 4. setup toolbarMenu
	toolbarMenuPopup = document.getElementById("translate-toolbutton-menupopup");
	if(toolbarMenuPopup)
		toolbarMenuPopup.setAttribute("class","toolbar-options-" + language);


	//set toolbar button class, which inturns sets the icon
  	if(toolbarItem != null) {
  		toolbarItem.setAttribute("class","translate-tool-" + PGTRANSLATE_LANGUAGEPAIRS[gPGTranslate.PGTranslate_prefs.getIntPref(gPGTranslate.PGTranslate_prefs.PREF_LANGUAGE)][0] + " toolbarbutton-1");
	}
}

PGTranslate.prototype.onTranslatePopup = function ()
{
	// Get the selected text
	var item = document.getElementById("translate-context");
	var sep = document.getElementById("translateSeparator");

	var focusedWindow = document.commandDispatcher.focusedWindow;
	var selection = focusedWindow.getSelection();
	
	if(gPGTranslate.PGTranslate_prefs.getBoolPref(gPGTranslate.PGTranslate_prefs.PREF_CONTEXTMENU_ENABLED) && selection!="") {
		// if the selected text is blank then don't display the context menu, otherwise, display the first 14 characters + ...
   
	    	//text selected so display the context menu
	    	var selectedText = selection.toString() ;
	    	selectedText = selectedText.trim();
	        if (selectedText.length > 15)  { // crop selected text if necessary
	            selectedText = selectedText.substr(0,15) + "...";
	        }
	        var menuText;

	        sep.hidden = false;  //display separator
	        item.hidden = false; //display menu
		
		if(gPGTranslate.translateBundle.getString("context.menu.prefix.position") == "0") {
	        	menuText = gPGTranslate.translateBundle.getString("context.menu.prefix") + " " + "\"" + selectedText + "\"";
	        } else	{
	        	menuText = "\"" + selectedText + "\"" + " " +  gPGTranslate.translateBundle.getString("context.menu.prefix") ;
	    	}
                
	        item.setAttribute("label", menuText);
	} else {
	    	//no text selected so hide the context menu	       	
	        sep.hidden = true;
	        item.hidden = true;
	}
	
}


PGTranslate.prototype.quick_translate = function() {
	window.content.document.location.href = PGTRANSLATE_QUICKTRANSLATIONSITE + encodeURIComponent(window.content.document.location.href);
}

PGTranslate.prototype.translateFrom = function(aLanguage) {
	window.content.document.location.href = PGTRANSLATE_TRANSLATIONSITE + PGTRANSLATE_SECONDARG + PGTRANSLATE_EQUALS + aLanguage + PGTRANSLATE_AMP + PGTRANSLATE_FIRSTARG + PGTRANSLATE_EQUALS + encodeURIComponent(window.content.document.location.href);
}

PGTranslate.prototype.translateSelection = function(aLanguage) {
	var focusedWindow = document.commandDispatcher.focusedWindow;
	var searchStr = focusedWindow.getSelection();
	getBrowser().addTab(PGTRANSLATE_SELECTIONSITE + PGTRANSLATE_SECONDARG + PGTRANSLATE_EQUALS + aLanguage + PGTRANSLATE_AMP + PGTRANSLATE_SELECTFIRSTARG + PGTRANSLATE_EQUALS + encodeURIComponent(searchStr.toString()));
}

PGTranslate.prototype.onClose = function() {
	window.getBrowser().removeProgressListener(this.myListener);
	document.getElementById("contentAreaContextMenu").removeEventListener("popupshowing",gPGTranslate.onTranslatePopup,false);
	gPGTranslate = null;
}


//  Need to make sure only browser
//  windows have gPGTranslate attached.
//if(window.location == "chrome://browser/content/browser.xul")
//{
	var gPGTranslate = new PGTranslate(); 
	window.addEventListener("load",gPGTranslate.onLoad,false);
	window.addEventListener("close", gPGTranslate.onClose, false);
//}