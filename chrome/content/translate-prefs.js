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
function PGTranslate_prefs(){
  this.prefBranch = null;
  
  // pref values
  this.PREF_CONTEXTMENU_ENABLED     = "translate.displayContextMenu"; // oops, sidebar?
  this.PREF_TOOLMENU_ENABLED        = "translate.displayToolMenu";
  this.PREF_LANGUAGE        = "translate.userlanguage";
}

PGTranslate_prefs.prototype.getPrefBranch = function(){
  if (!this.prefBranch){ 
    this.prefBranch = Components.classes['@mozilla.org/preferences-service;1'];
    this.prefBranch = this.prefBranch.getService();
    this.prefBranch = this.prefBranch.QueryInterface(Components.interfaces.nsIPrefBranch);
  }
  
  return this.prefBranch;
}

PGTranslate_prefs.prototype.setBoolPref = function(aName, aValue){
  var myPrefs = this.getPrefBranch();
  
  myPrefs.setBoolPref(aName, aValue);
}


PGTranslate_prefs.prototype.getBoolPref = function(aName){
  var myPrefs = this.getPrefBranch();
  var rv = null;

  try{
    rv = myPrefs.getBoolPref(aName);
  } catch (e){
  
  }
  
  return rv;
}

PGTranslate_prefs.prototype.setIntPref = function(aName, aValue){
  var myPrefs = this.getPrefBranch();
  
  myPrefs.setIntPref(aName, aValue);
}


PGTranslate_prefs.prototype.getIntPref = function(aName){
  var myPrefs = this.getPrefBranch();
  var rv = null;

  try{
    rv = myPrefs.getIntPref(aName);
  } catch (e){
  
  }
  
  return rv;
}

PGTranslate_prefs.prototype.setCharPref = function(aName, aValue){
  var myPrefs = this.getPrefBranch();
  
  myPrefs.setCharPref(aName, aValue);
}


PGTranslate_prefs.prototype.getCharPref = function(aName){
  var myPrefs = this.getPrefBranch();
  var rv = null;

  try{
    rv = myPrefs.getCharPref(aName);
  } catch (e){
  
  }
  
  return rv;
}