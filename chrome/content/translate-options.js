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
var PGTranslate_prefs;
function pg_prefs_load() {
	PGTranslate_prefs = new PGTranslate_prefs();
	initListBox();
	document.getElementById("translate.prefs.language.selection").selectedIndex = PGTranslate_prefs.getIntPref(PGTranslate_prefs.PREF_LANGUAGE);
	document.getElementById("translate.prefs.contextMenu").checked = PGTranslate_prefs.getBoolPref(PGTranslate_prefs.PREF_CONTEXTMENU_ENABLED);     
//	document.getElementById("translate.prefs.displayTools").checked = PGTranslate_prefs.getBoolPref(PGTranslate_prefs.PREF_TOOLMENU_ENABLED);
}

function initListBox() {
	var listbox = document.getElementById("translate.prefs.language.selection");
	var menupopup = document.createElement("menupopup");
	var listitem ;
	for(var i = 0;i < PGTRANSLATE_LANGUAGEPAIRS.length ; i++) {	
		listitem = document.createElement("menuitem");
		listitem.setAttribute("label",PGTRANSLATE_LANGUAGEUNICODE[i]);
		listitem.setAttribute("value",i);
		menupopup.appendChild(listitem);
	}
	listbox.appendChild(menupopup);
}

function pg_prefs_accept() {
	PGTranslate_prefs.setBoolPref(PGTranslate_prefs.PREF_CONTEXTMENU_ENABLED, document.getElementById("translate.prefs.contextMenu").checked)
//	PGTranslate_prefs.setBoolPref(PGTranslate_prefs.PREF_TOOLMENU_ENABLED, document.getElementById("translate.prefs.displayTools").checked);
	PGTranslate_prefs.setIntPref(PGTranslate_prefs.PREF_LANGUAGE, document.getElementById("translate.prefs.language.selection").selectedIndex);

	if(  window.opener && window.opener.opener && window.opener.opener.gPGTranslate) {
		window.opener.opener.gPGTranslate.initMenus();
	} else if (  window.opener && window.opener.gPGTranslate) {
		window.opener.gPGTranslate.initMenus();
	}

}