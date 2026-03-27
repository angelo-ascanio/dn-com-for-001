/**
 * =================================================================================
 * FASE 1: ARQUITECTURA DE DATOS Y ESTADO GLOBAL (EL CEREBRO)
 * =================================================================================
 */

const PDF_MAX_PROCESSES = 30;
const SECTIONS = ['sec-load', 'sec-initial', 'sec-na', 'sec-processes', 'sec-export'];

/* * 1. BASE DE DATOS NORMATIVA (INMUTABLE)
*/

let nm_NORM_DATA = {
    "ISO 9001:2015": {
        "4": {},"4.1": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.3": {},"4.3.a": {},"4.3.b": {},"4.3.c": {},"4.4": {},"4.4.1": {},"4.4.1.a": {},"4.4.1.b": {},"4.4.1.c": {},"4.4.1.d": {},"4.4.1.e": {},"4.4.1.f": {},"4.4.1.g": {},"4.4.1.h": {},"4.4.2": {},"4.4.2.a": {},"4.4.2.b": {},
        "5": {},"5.1": {},"5.1.1": {},"5.1.1.a": {},"5.1.1.b": {},"5.1.1.c": {},"5.1.1.d": {},"5.1.1.e": {},"5.1.1.f": {},"5.1.1.g": {},"5.1.1.h": {},"5.1.1.i": {},"5.1.1.j": {},"5.1.2": {},"5.1.2.a": {},"5.1.2.b": {},"5.1.2.c": {},"5.2": {},"5.2.1": {},"5.2.1.a": {},"5.2.1.b": {},"5.2.1.c": {},"5.2.1.d": {},"5.2.2": {},"5.2.2.a": {},"5.2.2.b": {},"5.2.2.c": {},"5.3": {},"5.3.a": {},"5.3.b": {},"5.3.c": {},"5.3.d": {},"5.3.e": {},
        "6": {},"6.1": {},"6.1.1": {},"6.1.1.a": {},"6.1.1.b": {},"6.1.1.c": {},"6.1.1.d": {},"6.1.2": {},"6.1.2.a": {},"6.1.2.b": {},"6.1.2.b.1": {},"6.1.2.b.2": {},"6.2": {},"6.2.1": {},"6.2.1.a": {},"6.2.1.b": {},"6.2.1.c": {},"6.2.1.d": {},"6.2.1.e": {},"6.2.1.f": {},"6.2.1.g": {},"6.2.2": {},"6.2.2.a": {},"6.2.2.b": {},"6.2.2.c": {},"6.2.2.d": {},"6.2.2.e": {},"6.3": {},"6.3.a": {},"6.3.b": {},"6.3.c": {},"6.3.d": {},
        "7": {},"7.1": {},"7.1.1": {},"7.1.1.a": {},"7.1.1.b": {},"7.1.2": {},"7.1.3": {},"7.1.3.a": {},"7.1.3.b": {},"7.1.3.c": {},"7.1.3.d": {},"7.1.4": {},"7.1.4.a": {},"7.1.4.b": {},"7.1.4.c": {},"7.1.5": {},"7.1.5.1": {},"7.1.5.1.a": {},"7.1.5.1.b": {},"7.1.5.2": {},"7.1.5.2.a": {},"7.1.5.2.b": {},"7.1.5.2.c": {},"7.1.6": {},"7.1.6.a": {},"7.1.6.b": {},"7.2": {},"7.2.a": {},"7.2.b": {},"7.2.c": {},"7.2.d": {},"7.3": {},"7.3.a": {},"7.3.b": {},"7.3.c": {},"7.3.d": {},"7.4": {},"7.4.a": {},"7.4.b": {},"7.4.c": {},"7.4.d": {},"7.4.e": {},"7.5": {},"7.5.1": {},"7.5.1.a": {},"7.5.1.b": {},"7.5.2": {},"7.5.2.a": {},"7.5.2.b": {},"7.5.2.c": {},"7.5.3": {},"7.5.3.1": {},"7.5.3.1.a": {},"7.5.3.1.b": {},"7.5.3.2": {},"7.5.3.2.a": {},"7.5.3.2.b": {},"7.5.3.2.c": {},"7.5.3.2.d": {},
        "8": {},"8.1": {},"8.1.a": {},"8.1.b": {},"8.1.b.1": {},"8.1.b.2": {},"8.1.c": {},"8.1.d": {},"8.1.e": {},"8.1.e.1": {},"8.1.e.2": {},"8.2": {},"8.2.1": {},"8.2.1.a": {},"8.2.1.b": {},"8.2.1.c": {},"8.2.1.d": {},"8.2.1.e": {},"8.2.2": {},"8.2.2.a": {},"8.2.2.a.1": {},"8.2.2.a.2": {},"8.2.2.b": {},"8.2.3": {},"8.2.3.1": {},"8.2.3.1.a": {},"8.2.3.1.b": {},"8.2.3.1.c": {},"8.2.3.1.d": {},"8.2.3.1.e": {},"8.2.3.2": {},"8.2.3.2.a": {},"8.2.3.2.b": {},"8.2.4": {},"8.3": {},"8.3.1": {},"8.3.2": {},"8.3.2.a": {},"8.3.2.b": {},"8.3.2.c": {},"8.3.2.d": {},"8.3.2.e": {},"8.3.2.f": {},"8.3.2.g": {},"8.3.2.h": {},"8.3.2.i": {},"8.3.2.j": {},"8.3.3": {},"8.3.3.a": {},"8.3.3.b": {},"8.3.3.c": {},"8.3.3.d": {},"8.3.3.e": {},"8.3.4": {},"8.3.4.a": {},"8.3.4.b": {},"8.3.4.c": {},"8.3.4.d": {},"8.3.4.e": {},"8.3.4.f": {},"8.3.5": {},"8.3.5.a": {},"8.3.5.b": {},"8.3.5.c": {},"8.3.5.d": {},"8.3.6": {},"8.3.6.a": {},"8.3.6.b": {},"8.3.6.c": {},"8.3.6.d": {},"8.4": {},"8.4.1": {},"8.4.1.a": {},"8.4.1.b": {},"8.4.1.c": {},"8.4.2": {},"8.4.2.a": {},"8.4.2.b": {},"8.4.2.c": {},"8.4.2.c.1": {},"8.4.2.c.2": {},"8.4.2.d": {},"8.4.3": {},"8.4.3.a": {},"8.4.3.b": {},"8.4.3.b.1": {},"8.4.3.b.2": {},"8.4.3.b.3": {},"8.4.3.c": {},"8.4.3.d": {},"8.4.3.e": {},"8.4.3.f": {},"8.5": {},"8.5.1": {},"8.5.1.a": {},"8.5.1.a.1": {},"8.5.1.a.2": {},"8.5.1.b": {},"8.5.1.c": {},"8.5.1.d": {},"8.5.1.e": {},"8.5.1.f": {},"8.5.1.g": {},"8.5.1.h": {},"8.5.2": {},"8.5.3": {},"8.5.4": {},"8.5.5": {},"8.5.5.a": {},"8.5.5.b": {},"8.5.5.c": {},"8.5.5.d": {},"8.5.5.e": {},"8.5.6": {},"8.6": {},"8.6.a": {},"8.6.b": {},"8.7": {},"8.7.1": {},"8.7.1.a": {},"8.7.1.b": {},"8.7.1.c": {},"8.7.1.d": {},"8.7.2": {},"8.7.2.a": {},"8.7.2.b": {},"8.7.2.c": {},"8.7.2.d": {},
        "9": {},"9.1": {},"9.1.1": {},"9.1.1.a": {},"9.1.1.b": {},"9.1.1.c": {},"9.1.1.d": {},"9.1.2": {},"9.1.3": {},"9.1.3.a": {},"9.1.3.b": {},"9.1.3.c": {},"9.1.3.d": {},"9.1.3.e": {},"9.1.3.f": {},"9.1.3.g": {},"9.2": {},"9.2.1": {},"9.2.1.a": {},"9.2.1.a.1": {},"9.2.1.a.2": {},"9.2.1.b": {},"9.2.2": {},"9.2.2.a": {},"9.2.2.b": {},"9.2.2.c": {},"9.2.2.d": {},"9.2.2.e": {},"9.2.2.f": {},"9.3": {},"9.3.1": {},"9.3.2": {},"9.3.2.a": {},"9.3.2.b": {},"9.3.2.c": {},"9.3.2.c.1": {},"9.3.2.c.2": {},"9.3.2.c.3": {},"9.3.2.c.4": {},"9.3.2.c.5": {},"9.3.2.c.6": {},"9.3.2.c.7": {},"9.3.2.d": {},"9.3.2.e": {},"9.3.2.f": {},"9.3.3": {},"9.3.3.a": {},"9.3.3.b": {},"9.3.3.c": {},
        "10": {},"10.1": {},"10.1.a": {},"10.1.b": {},"10.1.c": {},"10.2": {},"10.2.1": {},"10.2.1.a": {},"10.2.1.a.1": {},"10.2.1.a.2": {},"10.2.1.b": {},"10.2.1.b.1": {},"10.2.1.b.2": {},"10.2.1.b.3": {},"10.2.1.c": {},"10.2.1.d": {},"10.2.1.e": {},"10.2.1.f": {},"10.2.2": {},"10.2.2.a": {},"10.2.2.b": {},"10.3": {}
    },
    "ISO 14001:2015": {
        "4": {},"4.1": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.2.c": {},"4.3": {},"4.3.a": {},"4.3.b": {},"4.3.c": {},"4.3.d": {},"4.3.e": {},"4.4": {},
        "5": {},"5.1": {},"5.1.a": {},"5.1.b": {},"5.1.c": {},"5.1.d": {},"5.1.e": {},"5.1.f": {},"5.1.g": {},"5.1.h": {},"5.1.i": {},"5.2": {},"5.2.a": {},"5.2.b": {},"5.2.c": {},"5.2.d": {},"5.2.e": {},"5.3": {},"5.3.a": {},"5.3.b": {},
        "6": {},"6.1": {},"6.1.1": {},"6.1.1.a": {},"6.1.1.b": {},"6.1.1.c": {},"6.1.2": {},"6.1.2.a": {},"6.1.2.b": {},"6.1.3": {},"6.1.3.a": {},"6.1.3.b": {},"6.1.3.c": {},"6.1.4": {},"6.1.4.a": {},"6.1.4.a.1": {},"6.1.4.a.2": {},"6.1.4.a.3": {},"6.1.4.b": {},"6.1.4.b.1": {},"6.1.4.b.2": {},"6.2": {},"6.2.1": {},"6.2.1.a": {},"6.2.1.b": {},"6.2.1.c": {},"6.2.1.d": {},"6.2.1.e": {},"6.2.2": {},"6.2.2.a": {},"6.2.2.b": {},"6.2.2.c": {},"6.2.2.d": {},"6.2.2.e": {},
        "7": {},"7.1": {},"7.2": {},"7.2.a": {},"7.2.b": {},"7.2.c": {},"7.2.d": {},"7.3": {},"7.3.a": {},"7.3.b": {},"7.3.c": {},"7.3.d": {},"7.4": {},"7.4.1": {},"7.4.1.a": {},"7.4.1.b": {},"7.4.1.c": {},"7.4.1.d": {},"7.4.2": {},"7.4.2.a": {},"7.4.2.b": {},"7.4.3": {},"7.5": {},"7.5.1": {},"7.5.1.a": {},"7.5.1.b": {},"7.5.2": {},"7.5.2.a": {},"7.5.2.b": {},"7.5.2.c": {},"7.5.3": {},"7.5.3.a": {},"7.5.3.b": {},
        "8": {},"8.1": {},"8.1.a": {},"8.1.b": {},"8.1.c": {},"8.1.d": {},"8.2": {},"8.2.a": {},"8.2.b": {},"8.2.c": {},"8.2.d": {},"8.2.e": {},"8.2.f": {},
        "9": {},"9.1": {},"9.1.1": {},"9.1.1.a": {},"9.1.1.b": {},"9.1.1.c": {},"9.1.1.d": {},"9.1.1.e": {},"9.1.2": {},"9.1.2.a": {},"9.1.2.b": {},"9.1.2.c": {},"9.2": {},"9.2.1": {},"9.2.1.a": {},"9.2.1.a.1": {},"9.2.1.a.2": {},"9.2.1.b": {},"9.2.2": {},"9.2.2.a": {},"9.2.2.b": {},"9.2.2.c": {},"9.3": {},"9.3.a": {},"9.3.b": {},"9.3.b.1": {},"9.3.b.2": {},"9.3.b.3": {},"9.3.b.4": {},"9.3.c": {},"9.3.d": {},"9.3.d.1": {},"9.3.d.2": {},"9.3.d.3": {},"9.3.d.4": {},"9.3.e": {},"9.3.f": {},"9.3.g": {},
        "10": {},"10.1": {},"10.2": {},"10.2.a": {},"10.2.a.1": {},"10.2.a.2": {},"10.2.b": {},"10.2.b.1": {},"10.2.b.2": {},"10.2.b.3": {},"10.2.c": {},"10.2.d": {},"10.2.e": {},"10.3": {}
    },
    "ISO 45001:2018": {
        "4": {},"4.1": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.2.c": {},"4.3": {},"4.3.a": {},"4.3.b": {},"4.3.c": {},"4.4": {},
        "5": {},"5.1": {},"5.1.a": {},"5.1.b": {},"5.1.c": {},"5.1.d": {},"5.1.e": {},"5.1.f": {},"5.1.g": {},"5.1.h": {},"5.1.i": {},"5.1.j": {},"5.1.k": {},"5.1.l": {},"5.1.m": {},"5.2": {},"5.2.a": {},"5.2.b": {},"5.2.c": {},"5.2.d": {},"5.2.e": {},"5.2.f": {},"5.3": {},"5.3.a": {},"5.3.b": {},"5.4": {},"5.4.a": {},"5.4.b": {},"5.4.c": {},"5.4.d": {},"5.4.d.1": {},"5.4.d.2": {},"5.4.d.3": {},"5.4.d.4": {},"5.4.d.5": {},"5.4.d.6": {},"5.4.d.7": {},"5.4.d.8": {},"5.4.d.9": {},"5.4.e": {},"5.4.e.1": {},"5.4.e.2": {},"5.4.e.3": {},"5.4.e.4": {},"5.4.e.5": {},"5.4.e.6": {},"5.4.e.7": {},
        "6": {},"6.1": {},"6.1.1": {},"6.1.1.a": {},"6.1.1.b": {},"6.1.1.c": {},"6.1.2": {},"6.1.2.1": {},"6.1.2.1.a": {},"6.1.2.1.b": {},"6.1.2.1.b.1": {},"6.1.2.1.b.2": {},"6.1.2.1.b.3": {},"6.1.2.1.b.4": {},"6.1.2.1.c": {},"6.1.2.1.d": {},"6.1.2.1.e": {},"6.1.2.1.e.1": {},"6.1.2.1.e.2": {},"6.1.2.1.e.3": {},"6.1.2.1.f": {},"6.1.2.1.f.1": {},"6.1.2.1.f.2": {},"6.1.2.1.f.3": {},"6.1.2.1.g": {},"6.1.2.1.h": {},"6.1.2.2": {},"6.1.2.2.a": {},"6.1.2.2.b": {},"6.1.2.3": {},"6.1.2.3.a": {},"6.1.2.3.a.1": {},"6.1.2.3.a.2": {},"6.1.2.3.b": {},"6.1.3": {},"6.1.3.a": {},"6.1.3.b": {},"6.1.3.c": {},"6.1.4": {},"6.1.4.a": {},"6.1.4.a.1": {},"6.1.4.a.2": {},"6.1.4.a.3": {},"6.1.4.b": {},"6.1.4.b.1": {},"6.1.4.b.2": {},"6.2": {},"6.2.1": {},"6.2.1.a": {},"6.2.1.b": {},"6.2.1.c": {},"6.2.1.c.1": {},"6.2.1.c.2": {},"6.2.1.c.3": {},"6.2.1.d": {},"6.2.1.e": {},"6.2.1.f": {},"6.2.2": {},"6.2.2.a": {},"6.2.2.b": {},"6.2.2.c": {},"6.2.2.d": {},"6.2.2.e": {},"6.2.2.f": {},
        "7": {},"7.1": {},"7.2": {},"7.2.a": {},"7.2.b": {},"7.2.c": {},"7.2.d": {},"7.3": {},"7.3.a": {},"7.3.b": {},"7.3.c": {},"7.3.d": {},"7.3.e": {},"7.3.f": {},"7.4": {},"7.4.1": {},"7.4.1.a": {},"7.4.1.b": {},"7.4.1.c": {},"7.4.1.c.1": {},"7.4.1.c.2": {},"7.4.1.c.3": {},"7.4.1.d": {},"7.4.2": {},"7.4.2.a": {},"7.4.2.b": {},"7.4.3": {},"7.5": {},"7.5.1": {},"7.5.1.a": {},"7.5.1.b": {},"7.5.2": {},"7.5.2.a": {},"7.5.2.b": {},"7.5.2.c": {},"7.5.3": {},"7.5.3.a": {},"7.5.3.b": {},
        "8": {},"8.1": {},"8.1.1": {},"8.1.1.a": {},"8.1.1.b": {},"8.1.1.c": {},"8.1.1.d": {},"8.1.2": {},"8.1.2.a": {},"8.1.2.b": {},"8.1.2.c": {},"8.1.2.d": {},"8.1.2.e": {},"8.1.3": {},"8.1.3.a": {},"8.1.3.b": {},"8.1.3.c": {},"8.1.3.d": {},"8.1.4": {},"8.1.4.1": {},"8.1.4.2": {},"8.1.4.2.a": {},"8.1.4.2.b": {},"8.1.4.2.c": {},"8.1.4.3": {},"8.2": {},"8.2.a": {},"8.2.b": {},"8.2.c": {},"8.2.d": {},"8.2.e": {},"8.2.f": {},"8.2.g": {},
        "9": {},"9.1": {},"9.1.1": {},"9.1.1.a": {},"9.1.1.a.1": {},"9.1.1.a.2": {},"9.1.1.a.3": {},"9.1.1.a.4": {},"9.1.1.b": {},"9.1.1.c": {},"9.1.1.d": {},"9.1.1.e": {},"9.1.2": {},"9.1.2.a": {},"9.1.2.b": {},"9.1.2.c": {},"9.1.2.d": {},"9.2": {},"9.2.1": {},"9.2.1.a": {},"9.2.1.a.1": {},"9.2.1.a.2": {},"9.2.1.b": {},"9.2.2": {},"9.2.2.a": {},"9.2.2.b": {},"9.2.2.c": {},"9.2.2.d": {},"9.2.2.e": {},"9.2.2.f": {},"9.3": {},"9.3.a": {},"9.3.b": {},"9.3.b.1": {},"9.3.b.2": {},"9.3.b.3": {},"9.3.c": {},"9.3.d": {},"9.3.d.1": {},"9.3.d.2": {},"9.3.d.3": {},"9.3.d.4": {},"9.3.d.5": {},"9.3.d.6": {},"9.3.e": {},"9.3.f": {},"9.3.g": {},
        "10": {},"10.1": {},"10.2": {},"10.2.a": {},"10.2.a.1": {},"10.2.a.2": {},"10.2.b": {},"10.2.b.1": {},"10.2.b.2": {},"10.2.b.3": {},"10.2.c": {},"10.2.d": {},"10.2.e": {},"10.2.f": {},"10.2.g": {},"10.3": {},"10.3.a": {},"10.3.b": {},"10.3.c": {},"10.3.d": {},"10.3.e": {}
    },
    "ISO 22000:2018": {
        "4": {},"4.1": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.3": {},"4.3.a": {},"4.3.b": {},"4.4": {},
        "5": {},"5.1": {},"5.1.a": {},"5.1.b": {},"5.1.c": {},"5.1.d": {},"5.1.e": {},"5.1.f": {},"5.1.g": {},"5.1.h": {},"5.2": {},"5.2.1": {},"5.2.1.a": {},"5.2.1.b": {},"5.2.1.c": {},"5.2.1.d": {},"5.2.1.e": {},"5.2.1.f": {},"5.2.2": {},"5.2.2.a": {},"5.2.2.b": {},"5.2.2.c": {},"5.3": {},"5.3.1": {},"5.3.1.a": {},"5.3.1.b": {},"5.3.1.c": {},"5.3.1.d": {},"5.3.2": {},"5.3.2.a": {},"5.3.2.b": {},"5.3.2.c": {},"5.3.2.d": {},"5.3.3": {},
        "6": {},"6.1": {},"6.1.1": {},"6.1.1.a": {},"6.1.1.b": {},"6.1.1.c": {},"6.1.1.d": {},"6.1.2": {},"6.1.2.a": {},"6.1.2.b": {},"6.1.2.b.1": {},"6.1.2.b.2": {},"6.1.3": {},"6.1.3.a": {},"6.1.3.b": {},"6.1.3.c": {},"6.2": {},"6.2.1": {},"6.2.1.a": {},"6.2.1.b": {},"6.2.1.c": {},"6.2.1.d": {},"6.2.1.e": {},"6.2.1.f": {},"6.2.2": {},"6.2.2.a": {},"6.2.2.b": {},"6.2.2.c": {},"6.2.2.d": {},"6.2.2.e": {},"6.3": {},"6.3.a": {},"6.3.b": {},"6.3.c": {},"6.3.d": {},
        "7": {},"7.1": {},"7.1.1": {},"7.1.1.a": {},"7.1.1.b": {},"7.1.2": {},"7.1.3": {},"7.1.4": {},"7.1.4.a": {},"7.1.4.b": {},"7.1.4.c": {},"7.1.5": {},"7.1.5.a": {},"7.1.5.b": {},"7.1.5.c": {},"7.1.5.d": {},"7.1.5.e": {},"7.1.6": {},"7.1.6.a": {},"7.1.6.b": {},"7.1.6.c": {},"7.1.6.d": {},"7.2": {},"7.2.a": {},"7.2.b": {},"7.2.c": {},"7.2.d": {},"7.2.e": {},"7.3": {},"7.3.a": {},"7.3.b": {},"7.3.c": {},"7.3.d": {},"7.4": {},"7.4.1": {},"7.4.1.a": {},"7.4.1.b": {},"7.4.1.c": {},"7.4.1.d": {},"7.4.1.e": {},"7.4.2": {},"7.4.2.a": {},"7.4.2.b": {},"7.4.2.b.1": {},"7.4.2.b.2": {},"7.4.2.b.3": {},"7.4.2.b.4": {},"7.4.2.c": {},"7.4.2.d": {},"7.4.3": {},"7.4.3.a": {},"7.4.3.b": {},"7.4.3.c": {},"7.4.3.d": {},"7.4.3.e": {},"7.4.3.f": {},"7.4.3.g": {},"7.4.3.h": {},"7.4.3.i": {},"7.4.3.j": {},"7.4.3.k": {},"7.4.3.l": {},"7.4.3.m": {},"7.5": {},"7.5.1": {},"7.5.1.a": {},"7.5.1.b": {},"7.5.1.c": {},"7.5.2": {},"7.5.2.a": {},"7.5.2.b": {},"7.5.2.c": {},"7.5.3": {},"7.5.3.1": {},"7.5.3.1.a": {},"7.5.3.1.b": {},"7.5.3.2": {},"7.5.3.2.a": {},"7.5.3.2.b": {},"7.5.3.2.c": {},"7.5.3.2.d": {},
        "8": {},"8.1": {},"8.1.a": {},"8.1.b": {},"8.1.c": {},"8.2": {},"8.2.1": {},"8.2.2": {},"8.2.2.a": {},"8.2.2.b": {},"8.2.2.c": {},"8.2.2.d": {},"8.2.3": {},"8.2.3.a": {},"8.2.3.b": {},"8.2.4": {},"8.2.4.a": {},"8.2.4.b": {},"8.2.4.c": {},"8.2.4.d": {},"8.2.4.e": {},"8.2.4.f": {},"8.2.4.g": {},"8.2.4.h": {},"8.2.4.i": {},"8.2.4.j": {},"8.2.4.k": {},"8.2.4.l": {},"8.3": {},"8.3.a": {},"8.3.b": {},"8.3.c": {},"8.4": {},"8.4.1": {},"8.4.2": {},"8.4.2.a": {},"8.4.2.a.1": {},"8.4.2.a.2": {},"8.4.2.a.3": {},"8.4.2.b": {},"8.4.2.c": {},"8.4.2.d": {},
            "8.5": {},"8.5.1": {},"8.5.1.1": {},"8.5.1.1.a": {},"8.5.1.1.b": {},"8.5.1.1.c": {},"8.5.1.2": {},"8.5.1.2.a": {},"8.5.1.2.b": {},"8.5.1.2.c": {},"8.5.1.2.d": {},"8.5.1.2.e": {},"8.5.1.2.f": {},"8.5.1.2.g": {},"8.5.1.2.h": {},"8.5.1.2.i": {},"8.5.1.3": {},"8.5.1.3.a": {},"8.5.1.3.b": {},"8.5.1.3.c": {},"8.5.1.3.d": {},"8.5.1.3.e": {},"8.5.1.3.f": {},"8.5.1.3.g": {},"8.5.1.4": {},"8.5.1.5": {},"8.5.1.5.1": {},"8.5.1.5.1.a": {},"8.5.1.5.1.b": {},"8.5.1.5.1.c": {},"8.5.1.5.1.d": {},"8.5.1.5.1.e": {},"8.5.1.5.2": {},"8.5.1.5.3": {},"8.5.1.5.3.a": {},"8.5.1.5.3.b": {},"8.5.1.5.3.c": {},"8.5.1.5.3.d": {},"8.5.2": {},"8.5.2.1": {},"8.5.2.2": {},"8.5.2.2.1": {},"8.5.2.2.1.a": {},"8.5.2.2.1.b": {},"8.5.2.2.1.c": {},"8.5.2.2.1.d": {},"8.5.2.2.1.e": {},"8.5.2.2.2": {},"8.5.2.2.2.a": {},"8.5.2.2.2.b": {},"8.5.2.2.2.c": {},"8.5.2.2.3": {},"8.5.2.2.3.a": {},"8.5.2.2.3.b": {},"8.5.2.2.3.c": {},"8.5.2.3": {},"8.5.2.3.a": {},"8.5.2.3.b": {},"8.5.2.4": {},"8.5.2.4.1": {},"8.5.2.4.1.a": {},"8.5.2.4.1.b": {},"8.5.2.4.1.b.1": {},"8.5.2.4.1.b.2": {},"8.5.2.4.1.b.3": {},"8.5.2.4.1.b.4": {},"8.5.2.4.2": {},"8.5.2.4.2.a": {},"8.5.2.4.2.b": {},"8.5.2.4.2.c": {},"8.5.3": {},"8.5.4": {},"8.5.4.1": {},"8.5.4.1.a": {},"8.5.4.1.b": {},"8.5.4.1.c": {},"8.5.4.1.d": {},"8.5.4.1.e": {},"8.5.4.1.f": {},"8.5.4.2": {},"8.5.4.3": {},"8.5.4.3.a": {},"8.5.4.3.b": {},"8.5.4.3.c": {},"8.5.4.3.d": {},"8.5.4.3.e": {},"8.5.4.3.f": {},"8.5.4.3.g": {},"8.5.4.4": {},"8.5.4.4.a": {},"8.5.4.4.b": {},"8.5.4.4.c": {},"8.5.4.4.d": {},"8.5.4.5": {},"8.6": {},"8.6.a": {},"8.6.b": {},"8.6.c": {},"8.6.d": {},"8.7": {},"8.7.a": {},"8.7.b": {},"8.7.c": {},"8.7.d": {},"8.7.e": {},"8.8": {},"8.8.1": {},"8.8.1.a": {},"8.8.1.b": {},"8.8.1.c": {},"8.8.1.d": {},"8.8.1.e": {},"8.8.2": {},"8.9": {},"8.9.1": {},"8.9.2": {},"8.9.2.1": {},"8.9.2.1.a": {},"8.9.2.1.b": {},"8.9.2.2": {},"8.9.2.3": {},"8.9.2.3.a": {},"8.9.2.3.b": {},"8.9.2.3.c": {},"8.9.2.4": {},"8.9.2.4.a": {},"8.9.2.4.b": {},"8.9.2.4.c": {},"8.9.3": {},"8.9.3.a": {},"8.9.3.b": {},"8.9.3.c": {},"8.9.3.d": {},"8.9.3.e": {},"8.9.3.f": {},"8.9.4": {},"8.9.4.1": {},"8.9.4.1.a": {},"8.9.4.1.b": {},"8.9.4.1.c": {},"8.9.4.2": {},"8.9.4.2.a": {},"8.9.4.2.b": {},"8.9.4.2.c": {},"8.9.4.3": {},"8.9.4.3.a": {},"8.9.4.3.b": {},"8.9.4.3.c": {},"8.9.5": {},"8.9.5.a": {},"8.9.5.b": {},"8.9.5.c": {},
        "9": {},"9.1": {},"9.1.1": {},"9.1.1.a": {},"9.1.1.b": {},"9.1.1.c": {},"9.1.1.d": {},"9.1.1.e": {},"9.1.2": {},"9.1.2.a": {},"9.1.2.b": {},"9.1.2.c": {},"9.1.2.d": {},"9.1.2.e": {},"9.2": {},"9.2.1": {},"9.2.1.a": {},"9.2.1.a.1": {},"9.2.1.a.2": {},"9.2.1.b": {},"9.2.2": {},"9.2.2.a": {},"9.2.2.b": {},"9.2.2.c": {},"9.2.2.d": {},"9.2.2.e": {},"9.2.2.f": {},"9.2.2.g": {},"9.3": {},"9.3.1": {},"9.3.2": {},"9.3.2.a": {},"9.3.2.b": {},"9.3.2.c": {},"9.3.2.c.1": {},"9.3.2.c.2": {},"9.3.2.c.3": {},"9.3.2.c.4": {},"9.3.2.c.5": {},"9.3.2.c.6": {},"9.3.2.c.7": {},"9.3.2.c.8": {},"9.3.2.c.9": {},"9.3.2.d": {},"9.3.2.e": {},"9.3.2.f": {},"9.3.2.g": {},"9.3.3": {},"9.3.3.a": {},"9.3.3.b": {},
        "10": {},"10.1": {},"10.1.1": {},"10.1.1.a": {},"10.1.1.a.1": {},"10.1.1.a.2": {},"10.1.1.b": {},"10.1.1.b.1": {},"10.1.1.b.2": {},"10.1.1.b.3": {},"10.1.1.c": {},"10.1.1.d": {},"10.1.1.e": {},"10.1.2": {},"10.1.2.a": {},"10.1.2.b": {},"10.2": {},"10.3": {},"10.3.a": {},"10.3.b": {},"10.3.c": {},"10.3.d": {}
    },
    "ISO 27001:2022": {
        "4": {},"4.1": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.2.c": {},"4.3": {},"4.3.a": {},"4.3.b": {},"4.3.c": {},"4.4": {},
        "5": {},"5.1": {},"5.1.a": {},"5.1.b": {},"5.1.c": {},"5.1.d": {},"5.1.e": {},"5.1.f": {},"5.1.g": {},"5.1.h": {},"5.2": {},"5.2.a": {},"5.2.b": {},"5.2.c": {},"5.2.d": {},"5.2.e": {},"5.2.f": {},"5.2.g": {},"5.3": {},"5.3.a": {},"5.3.b": {},
        "6": {},"6.1": {},"6.1.1": {},"6.1.1.a": {},"6.1.1.b": {},"6.1.1.c": {},"6.1.1.d": {},"6.1.1.e": {},"6.1.1.e.1": {},"6.1.1.e.2": {},"6.1.2": {},"6.1.2.a": {},"6.1.2.a.1": {},"6.1.2.a.2": {},"6.1.2.b": {},"6.1.2.c": {},"6.1.2.c.1": {},"6.1.2.c.2": {},"6.1.2.d": {},"6.1.2.d.1": {},"6.1.2.d.2": {},"6.1.2.d.3": {},"6.1.2.e": {},"6.1.2.e.1": {},"6.1.2.e.2": {},"6.1.3": {},"6.1.3.a": {},"6.1.3.b": {},"6.1.3.c": {},"6.1.3.d": {},"6.1.3.e": {},"6.1.3.f": {},"6.2": {},"6.2.a": {},"6.2.b": {},"6.2.c": {},"6.2.d": {},"6.2.e": {},"6.2.f": {},"6.2.g": {},"6.2.h": {},"6.2.i": {},"6.2.j": {},"6.2.k": {},"6.2.l": {},"6.3": {},
        "7": {},"7.1": {},"7.2": {},"7.2.a": {},"7.2.b": {},"7.2.c": {},"7.2.d": {},"7.3": {},"7.3.a": {},"7.3.b": {},"7.3.c": {},"7.4": {},"7.4.a": {},"7.4.b": {},"7.4.c": {},"7.4.d": {},"7.5": {},"7.5.1": {},"7.5.1.a": {},"7.5.1.b": {},"7.5.1.b.1": {},"7.5.1.b.2": {},"7.5.1.b.3": {},"7.5.2": {},"7.5.2.a": {},"7.5.2.b": {},"7.5.2.c": {},"7.5.3": {},"7.5.3.a": {},"7.5.3.b": {},"7.5.3.c": {},"7.5.3.d": {},"7.5.3.e": {},"7.5.3.f": {},
        "8": {},"8.1": {},"8.2": {},"8.3": {},
        "9": {},"9.1": {},"9.1.a": {},"9.1.b": {},"9.1.c": {},"9.1.d": {},"9.1.e": {},"9.1.f": {},"9.2": {},"9.2.1": {},"9.2.1.a": {},"9.2.1.a.1": {},"9.2.1.a.2": {},"9.2.1.b": {},"9.2.2": {},"9.2.2.a": {},"9.2.2.b": {},"9.2.2.c": {},"9.3": {},"9.3.1": {},"9.3.2": {},"9.3.2.a": {},"9.3.2.b": {},"9.3.2.c": {},"9.3.2.d": {},"9.3.2.d.1": {},"9.3.2.d.2": {},"9.3.2.d.3": {},"9.3.2.d.4": {},"9.3.2.e": {},"9.3.2.f": {},"9.3.2.g": {},"9.3.3": {},
        "10": {},"10.1": {},"10.2": {},"10.2.a": {},"10.2.a.1": {},"10.2.a.2": {},"10.2.b": {},"10.2.b.1": {},"10.2.b.2": {},"10.2.b.3": {},"10.2.c": {},"10.2.d": {},"10.2.e": {},"10.2.f": {},"10.2.g": {}
    },
    "NTF 4073:2022": {
        "4": {},"4.1": {},"4.1.a": {},"4.1.b": {},"4.1.c": {},"4.1.d": {},"4.2": {},"4.2.a": {},"4.2.b": {},"4.2.c": {},"4.2.d": {},"4.2.e": {},"4.2.f": {},"4.2.g": {},"4.2.h": {},"4.2.i": {},"4.2.j": {},"4.2.k": {},"4.2.l": {},"4.2.m": {},"4.2.n": {},"4.2.o": {},"4.2.p": {},"4.2.q": {},"4.2.r": {},"4.2.s": {},
        "5": {},"5.1": {},"5.2": {},"5.3": {},"5.3.1": {},"5.3.1.a": {},"5.3.1.b": {},"5.3.1.c": {},"5.3.1.d": {},"5.3.1.e": {},"5.3.2": {},"5.3.3": {},"5.3.4": {},"5.3.4.a": {},"5.3.4.b": {},"5.3.4.c": {},"5.3.4.d": {},"5.3.4.e": {},"5.3.4.f": {},"5.3.5": {},"5.4": {},"5.4.1": {},"5.4.1.a": {},"5.4.1.b": {},"5.4.1.c": {},"5.4.1.d": {},"5.4.1.e": {},"5.4.1.f": {},"5.4.1.g": {},"5.4.1.h": {},"5.4.2": {},"5.4.2.a": {},"5.4.2.b": {},"5.4.2.c": {},"5.4.3": {},"5.4.4": {},"5.4.5": {},"5.4.6": {},"5.4.6.1": {},"5.4.6.1.a": {},"5.4.6.1.b": {},"5.4.6.1.c": {},"5.4.6.1.d": {},"5.4.6.2": {},"5.4.6.2.a": {},"5.4.6.2.b": {},"5.4.6.2.c": {},"5.4.6.2.d": {},"5.4.6.2.e": {},"5.4.6.2.f": {},"5.4.6.2.g": {},"5.4.7": {},"5.4.7.1": {},"5.4.7.1.a": {},"5.4.7.1.b": {},"5.4.7.1.c": {},"5.4.7.1.d": {},"5.4.7.1.e": {},"5.4.7.1.f": {},"5.4.7.1.g": {},"5.4.7.1.h": {},"5.4.7.1.i": {},"5.4.7.2": {},"5.4.7.2.a": {},"5.4.7.2.b": {},"5.4.7.2.c": {},"5.4.7.2.d": {},
        "6": {},"6.1": {},"6.2": {},"6.3": {},"6.4": {},
        "7": {},"7.1": {},"7.2": {},"7.3": {}
    }
};

let new_NORM_DATA = {};
let coveredSet = new Set();
let coveredStd = {};

/**
 * Enriches nm_NORM_DATA with parent, children, ancestors, and descendants.
 * This runs once at startup to optimize all future lookups.
 */
/**
 * Enriches nm_NORM_DATA with parent, children, ancestors, and descendants.
 * Adapted for the new structure: Standard -> Clause -> Properties
 */
function enrichNormData() {
    // Iterate over each Standard (e.g., "ISO 9001:2015", "ISO 14001:2015")
    for (const std in nm_NORM_DATA) {
        const clauses = nm_NORM_DATA[std];
        const keys = Object.keys(clauses);

        // 1. Initial Pass: Establish Parent and Children
        keys.forEach(key => {
            clauses[key].children = [];
            clauses[key].ancestors = [];
            clauses[key].descendants = [];

            // Logic to find parent: "4.1.a" -> split by '.' -> "4.1"
            const parts = key.split('.');
            if (parts.length > 1) {
                parts.pop();
                const potentialParent = parts.join('.');
                
                // Only assign if the parent exists in THIS standard
                if (clauses[potentialParent]) {
                    clauses[key].parent = potentialParent;
                    // Add this key to the parent's children list
                    if (!clauses[potentialParent].children) clauses[potentialParent].children = [];
                    clauses[potentialParent].children.push(key);
                } else {
                    clauses[key].parent = null;
                }
            } else {
                clauses[key].parent = null;
            }
        });

        // 2. Second Pass: Ancestors (Bottom-Up)
        keys.forEach(key => {
            let current = clauses[key].parent;
            while (current) {
                clauses[key].ancestors.push(current);
                current = clauses[current]?.parent;
            }
        });

        // 3. Third Pass: Descendants (Top-Down)
        keys.forEach(key => {
            let desc = clauses[key].children;
            while (desc && desc.length > 0) {
                const nextDesc = [];
                desc.forEach(child => {
                    clauses[key].descendants.push(child);
                    nextDesc.push(...(clauses[child]?.children || []));
                });
                desc = nextDesc;
            }
        });
    }

    console.log("🚀 nm_NORM_DATA enriched");
}

/* =================================================================================
 * FIN DE nm_NORM_DATA (FASE 4.1 COMPLETADA)
 * =================================================================================
 */

// NOTA: ELIMINAMOS DataUtils y RAW_CLAUSES_CSV porque ya tenemos nm_NORM_DATA estructurado.

/**
 * =================================================================================
 * FASE 1 & 3: ESTADO GLOBAL (APP STATE)
 * =================================================================================
 */

function initNavigation() {
    // Al cargar, validar el estado inicial
    navigateFlow(appState.navigate || 'sec-load');
}

const appState = {
  meta: {
    organizationName: "",
    reportDate: new Date().toISOString().split('T')[0]
  },
  Standards: new Set(),
  standardDetails: {},
  processes: [],
  nonApplicableClauses: [], // effective NA result
  nonApplicableIntent: [],  // intent for NA modal restore
  lastPath: [],
  naLastPath: [],
  navigate: ""
};

// Variable para controlar si estamos creando o editando un proceso (Fase 4.2)
let editingProcessId = null; 
// Variable para caché de búsqueda (Puente entre Fase 4.1 y el Buscador)
let SEARCH_INDEX = []; 

/* =================================================================================
 * FASE 0: INICIALIZACIÓN (LOGIC) [cite: 17, 19]
 * =================================================================================
 */

// Function to handle the "New Document" card click
function startNewDocument() {
    resetAppState();
    navigateFlow('sec-initial');
    refreshMainNav();
}

// The logic to clean the app state (Currently disabled in invocation above)
function resetAppState() {
  // 1. Reset data
  appState.meta = {
    organizationName: "",
    reportDate: new Date().toISOString().split('T')[0]
  };

  appState.Standards.clear();
  appState.standardDetails = {};
  appState.processes = [];
  appState.nonApplicableClauses = [];
  appState.nonApplicableIntent = [];
  appState.lastPath = [];
  appState.naLastPath = [];

  // 2. Reset transient modal state
  markedClauses = {};
  currentPath = [];
  currentProcessId = null;

  // 3. Persist
  saveAppState();

  // 4. Reset visible inputs
  document.getElementById('input-org').value = "";
  document.getElementById('input-date').value = appState.meta.reportDate;

  editingProcessId = null;

  document.querySelectorAll('#standards-checks input').forEach(el => {
    el.checked = false;
  });

  // 5. Re-render EVERYTHING that can show stale data
  initStandardsUI();
  renderInitial();
  renderProcesses();
  renderProcessesStatus();
  renderNaSummary();
  renderCrossConflictBanner();
  renderExportStatus();
  updateSlimBar();
  refreshMainNav();
}

/**
 * =================================================================================
 * INICIALIZACIÓN (BOOTSTRAPPING)
 * =================================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    enrichNormData();
    loadAppState();
    initStandardsUI();
    renderInitial();
    renderProcesses();
    renderProcessesStatus();
    renderNaSummary();
    renderCrossConflictBanner();
    initNavigation();
    updateSlimBar();
    renderExportStatus();
    refreshMainNav();
});

/**
 * =================================================================================
 * FASE 3: LÓGICA DE DATOS (META Y NORMAS)
 * =================================================================================
 */
function updateMeta(field, value) {
    appState.meta[field] = value;
    saveAppState();
}

const AVAILABLE_STANDARDS = [
    "ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", 
    "ISO 22000:2018", "ISO 27001:2022", "NTF 4073:2022"
];

function initStandardsUI() {
    const container = document.getElementById('standards-checks');
    container.className = 'standards-list-container'; 
    
    container.innerHTML = AVAILABLE_STANDARDS.map((std, index) => {
        const isSelected = appState.Standards.has(std);
        const details = appState.standardDetails[std] || { type: '', cert: 'N/A' };
        
        return `
        <div class="std-row-compact">
            <button type="button" 
                    id="btn-std-${index}" 
                    class="chap-btn std ${isSelected ? 'active' : ''}" 
                    style="padding: 8px; font-size: 0.95rem; width: 150px; flex-shrink: 0;"
                    onclick="toggleStandard('${std}', ${index})">
                ${std}
            </button>
            
            <select id="sel-std-${index}" 
                    class="std-compact-select" 
                    ${isSelected ? '' : 'disabled'} 
                    onchange="handleStandardSelectChange('${std}', ${index})">
                <option value="N/A" ${details.type === 'N/A' || !isSelected ? 'selected' : 'hidden'}>N/A</option>
                <option value="" ${details.type === '' && isSelected ? 'selected' : 'hidden'} disabled>Seleccione...</option>
                <option value="Estudio" ${details.type === 'Estudio' ? 'selected' : ''}>Estudio</option>
                <option value="Seguimiento" ${details.type === 'Seguimiento' ? 'selected' : ''}>Seguimiento</option>
                <option value="Renovación" ${details.type === 'Renovación' ? 'selected' : ''}>Renovación</option>
                <option value="Diagnóstico" ${details.type === 'Diagnóstico' ? 'selected' : ''}>Diagnóstico</option>
                <option value="Restauración" ${details.type === 'Restauración' ? 'selected' : ''}>Restauración</option>
                <option value="Transferencia" ${details.type === 'Transferencia' ? 'selected' : ''}>Transferencia</option>
                <option value="Otro" ${details.type === 'Otro' ? 'selected' : ''}>Otro</option>
            </select>
            
            <input type="text" 
                   id="inp-std-${index}" 
                   class="std-compact-input" 
                   value="${details.cert}" 
                   ${isSelected && details.type && details.type !== 'N/A' ? '' : 'disabled'}
                   oninput="handleStandardInputChange('${std}', ${index})"
                   onblur="handleStandardInputBlur('${std}', ${index})">
        </div>
        `;
    }).join('');
    
    document.getElementById('input-org').value = appState.meta.organizationName;
    document.getElementById('input-date').value = appState.meta.reportDate;
    for (let index = 0; index < AVAILABLE_STANDARDS.length; index++) {
        if (appState.Standards.has(AVAILABLE_STANDARDS[index])) {
            const sel = document.getElementById(`sel-std-${index}`);
            const inp = document.getElementById(`inp-std-${index}`);

            switch(sel.value) {
                case "Estudio":       inp.disabled=true; break;
                case "Diagnóstico":   inp.disabled=true; break;
                case "Transferencia": inp.disabled=true; break;
                case "Otro":          inp.disabled=true; break;
            }

            handleStandardInputChange(AVAILABLE_STANDARDS[index], index);
            if (inp.value.trim() == "") {
                inp.classList.remove('invalid-format');
                inp.placeholder = "Número de Certificado...";
            }
        }
    }
}

function toggleStandard(stdName, index) {
    if (appState.Standards.has(stdName)) {
        appState.Standards.delete(stdName);
        delete appState.standardDetails[stdName]; // Clean data
    } else {
        appState.Standards.add(stdName);
        appState.standardDetails[stdName] = { type: "", cert: "N/A" };
    }

    saveAppState();
    initStandardsUI(); // Simplest way to reflect complete state change
    renderInitial();
    validateStep('sec-initial'); 
}

// --- AÑADIR NUEVA FUNCIÓN ---

function handleStandardSelectChange(stdName, index) {
    const sel = document.getElementById(`sel-std-${index}`);
    const inp = document.getElementById(`inp-std-${index}`);
    const val = sel.value;
    inp.classList.remove('invalid-format');
    if (val === "N/A" || val === "") {
        inp.value = "N/A";
        inp.disabled = true;
        appState.standardDetails[stdName] = { type: val, cert: "N/A" };
        saveAppState();
        return;
    }

    //const codeMatch = stdName.match(/\d{4}/);
    //const stdCode = codeMatch ? codeMatch[0] : "0000";
    const stdCode = getStandardPrefix(stdName);
    const now = new Date();
    const hhmm = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
    const ddmmYYYY = String(now.getDate()).padStart(2, '0') + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + now.getFullYear();

    let codeResult = "";
    switch(val) {
        case "Estudio":       codeResult = `${stdCode}e-${hhmm}-${ddmmYYYY}`; inp.disabled=true; break;
        //case "Seguimiento":   codeResult = `${stdCode}-`; inp.disabled=false; break;
        //case "Renovación":    codeResult = `${stdCode}-`; inp.disabled=false; break;
        case "Diagnóstico":   codeResult = `${stdCode}d-${hhmm}-${ddmmYYYY}`; inp.disabled=true; break;
        //case "Restauración":  codeResult = `${stdCode}-`; inp.disabled=false; break;
        case "Transferencia": codeResult = `${stdCode}t-${hhmm}-${ddmmYYYY}`; inp.disabled=true; break;
        case "Otro":          codeResult = `${stdCode}o-${hhmm}-${ddmmYYYY}`; inp.disabled=true; break;
        default:              codeResult = ""; inp.disabled=false; inp.placeholder= "Número de Certificado...";break;
    }
    inp.value = codeResult;
    appState.standardDetails[stdName] = { type: val, cert: codeResult };
    saveAppState();
    validateStep('sec-initial'); 
}

function handleStandardInputChange(stdName, index) {
    const inp = document.getElementById(`inp-std-${index}`);
    const isValid = validateCertificateFormat(inp.value.trim(), stdName);
    if (!isValid) {
        inp.classList.add('invalid-format'); // Poner rojo
        updateNavUI(false); // Bloquear navegación inmediatamente
    } else {
        inp.classList.remove('invalid-format'); // Quitar rojo
        validateStep('sec-initial'); // Si es válido, comprobar el resto del form
    }
}

function handleStandardInputBlur(stdName, index) {
    const inp = document.getElementById(`inp-std-${index}`);
    if (inp.disabled) {
        inp.classList.remove('invalid-format');
        return 
    };

    const val = inp.value.trim();
    const isValid = validateCertificateFormat(val, stdName);

    if (isValid) {
        // Formatear (rellenar con ceros) y refrescar el input
        const formattedValue = formatCertificateString(val, stdName);
        inp.value = formattedValue; 
        
        // Guardar en appState con el formato correcto
        if (appState.standardDetails[stdName]) {
            appState.standardDetails[stdName].cert = formattedValue;
            saveAppState();
        }
        
        validateStep('sec-initial'); // Confirmar que todo está bien
    } else {
        if (inp.value.trim() == "") {
            inp.classList.remove('invalid-format');
            inp.placeholder = "Número de Certificado...";
        } else {
            inp.classList.add('invalid-format');
        }
        updateNavUI(false);
    }
}

// Extrae el prefijo correcto (Ej: "9001" o "HACCP")
function getStandardPrefix(stdName) {
    if (stdName.includes("NTF 4073")) return "HACCP";
    const codeMatch = stdName.match(/\d{4,5}/);
    return codeMatch ? codeMatch[0] : "0000";
}

// Valida los límites y el formato xxxx-A-B-C-DDDD
function validateCertificateFormat(value, stdName) {
    let prefix = getStandardPrefix(stdName);
    let sel;
    for (let index = 0; index < AVAILABLE_STANDARDS.length; index++) {
        const std = AVAILABLE_STANDARDS[index];
        if (std === stdName) {
            sel = document.getElementById(`sel-std-${index}`);
            break;
        }
    }

    switch(sel.value) {
        case "Estudio":       prefix = `${prefix}e`; break;
        case "Diagnóstico":   prefix = `${prefix}d`; break;
        case "Transferencia": prefix = `${prefix}t`; break;
        case "Otro":          prefix = `${prefix}o`; break;
    }

    // Regex: Prefijo - (1 a 4 digitos) - (1 a 2 digitos) - (1 a 2 digitos) - (4 digitos)
    const regex = new RegExp(`^${prefix}-(\\d{1,4})-(\\d{1,2})-(\\d{1,2})-(\\d{4})$`);
    const match = value.match(regex);

    if (!match) return false;

    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    const c = parseInt(match[3], 10);
    const d = parseInt(match[4], 10);
    const currentYear = new Date().getFullYear();

    if (a >= 24000) return false; // A debe ser menor a 24000
    if (b < 1 || b > 39) return false; // B entre 1 y 39
    if (c < 1 || c > 12) return false; // C (Mes) entre 1 y 12
    if (d <= 1950 || d > currentYear) return false; // D (Año) > 1950 y <= Año actual

    return true;
}

function formatCertificateString(value, stdName) {
    const prefix = getStandardPrefix(stdName);
    const regex = new RegExp(`^${prefix}-(\\d{1,4})-(\\d{1,2})-(\\d{1,2})-(\\d{4})$`);
    const match = value.match(regex);
    
    if (!match) return value; // Fallback de seguridad
    
    const a = match[1].padStart(4, '0');
    const b = match[2].padStart(2, '0');
    const c = match[3].padStart(2, '0');
    const d = match[4]; // Año ya tiene 4 dígitos
    
    return `${prefix}-${a}-${b}-${c}-${d}`;
}

function validateStep(stepId) {
    let isValid = true;
    
    if (stepId === 'sec-initial') {
        const org = document.getElementById('input-org').value.trim();
        const date = document.getElementById('input-date').value;
        const hasStandards = appState.Standards.size > 0;
        
        if (org === "" || date === "" || !hasStandards) {
            isValid = false;
        }

        // Usamos AVAILABLE_STANDARDS para tener acceso al index (0 a 5) y comparamos con el Set
        AVAILABLE_STANDARDS.forEach((std, index) => {
            if (appState.Standards.has(std)) {
                const sel = document.getElementById(`sel-std-${index}`);
                const inp = document.getElementById(`inp-std-${index}`);
                
                if (!sel || !inp) {
                    isValid = false;
                };
                
                // Si no hay tipo de certificación seleccionado
                if (sel.value == "" || sel.value == "N/A") {
                    isValid = false;
                }
                
                if (inp.disabled) {
                    // Validar los autogenerados (Solo asegurarse de que no estén vacíos)
                    if (inp.value.trim() === "" || inp.value.trim() === "N/A") {
                        isValid = false;
                        inp.classList.remove('invalid-format');
                    }
                } else {
                    // Validar estrictamente los ingresados manualmente (Seguimiento, Renovación, etc.)
                    if (!validateCertificateFormat(inp.value.trim(), std)) {
                        isValid = false;
                        if (inp.value.trim() == "") {
                            inp.classList.remove('invalid-format');
                        } else {
                            inp.classList.add('invalid-format');
                        }
                    } else {
                        inp.classList.remove('invalid-format');
                    }
                }
            }
        });

        // Guardar metadata global solo si el paso es válido
        appState.meta.organizationName = org;
        appState.meta.reportDate = date;
        saveAppState();
        return isValid;
    }

    if (stepId === 'sec-na') {
        const navNa = document.getElementById('nav-sec-na');
        const navProcess = document.getElementById('nav-sec-processes');

        if (!navNa.classList.contains('current')) {
            (navNa, 'complete');
        }

        navProcess.disabled = false;
        navProcess.classList.remove('locked');

        if (!navProcess.classList.contains('current') && !navProcess.classList.contains('complete')) {
            setNavClass(navProcess, 'incomplete');
        }
    }

    if (stepId === 'sec-processes') {
        const navProcess = document.getElementById('nav-sec-processes');
        const navExport = document.getElementById('nav-sec-export');

        if (!navProcess.classList.contains('current')) {
            setNavClass(navProcess, 'complete');
        }

        navExport.disabled = false;
        navExport.classList.remove('locked');

        if (!navExport.classList.contains('current') && !navExport.classList.contains('complete')) {
            setNavClass(navExport, 'incomplete');
        }
    }
    // Actualizar botones y navegación (Pasar a updateNavUI si es false, bloquea)
    updateNavUI(isValid);
}

function updateNavUI(isInitialValid) {
    const btnNextInitial = document.getElementById('btn-next-initial');
    if (btnNextInitial) {
        btnNextInitial.disabled = !isInitialValid;
    }

    refreshMainNav();
}

function setNavClass(element, state) {
    if (!element) return;
    element.classList.remove('locked', 'incomplete', 'complete', 'error');
    if (state) element.classList.add(state);
}

function setNavStatusClass(element, state) {
    if (!element) return;
    element.classList.remove('locked', 'incomplete', 'complete', 'error');
    if (state) element.classList.add(state);
}

function setCurrentNav(targetId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('current');
    });

    const target = document.getElementById(`nav-${targetId}`);
    if (target) target.classList.add('current');
}

function hasInitialErrors() {
    for (let index = 0; index < AVAILABLE_STANDARDS.length; index++) {
        const std = AVAILABLE_STANDARDS[index];
        if (!appState.Standards.has(std)) continue;

        const sel = document.getElementById(`sel-std-${index}`);
        const inp = document.getElementById(`inp-std-${index}`);

        if (!sel || !inp) return true;

        // selected standard but missing audit type
        if (sel.value === "" || sel.value === "N/A") return true;

        // manual cert mode => invalid format
        if (!inp.disabled && !validateCertificateFormat(inp.value.trim(), std)) return true;

        // auto mode but no generated value
        if (inp.disabled && (inp.value.trim() === "" || inp.value.trim() === "N/A")) return true;
    }

    return false;
}

function navigateFlow(targetId) {
    appState.navigate = targetId;
    saveAppState();

    updateSlimBar();

    document.querySelectorAll('.spa-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(targetId).classList.remove('hidden');

    validateStep(targetId);
    refreshMainNav();
}

function refreshMainNav() {
    const current = appState.navigate || 'sec-load';

    const navLoad = document.getElementById('nav-sec-load');
    const navInitial = document.getElementById('nav-sec-initial');
    const navNa = document.getElementById('nav-sec-na');
    const navProcesses = document.getElementById('nav-sec-processes');
    const navExport = document.getElementById('nav-sec-export');

    const loadComplete = isLoadComplete();
    const initialState = getInitialSectionState(); // complete / incomplete / error
    const processesComplete = isProcessesComplete();
    const exportReady = isDocumentReadyForFinalExport();

    // LOAD
    if (navLoad) {
        navLoad.disabled = false;
        navLoad.classList.remove('locked');
        setNavClass(navLoad, loadComplete ? 'complete' : 'incomplete');
    }

    // INITIAL
    if (navInitial) {
        navInitial.disabled = !loadComplete;
        if (!loadComplete) {
            setNavClass(navInitial, 'locked');
        } else {
            setNavClass(navInitial, initialState);
        }
    }

    // NA (optional once Initial is valid)
    if (navNa) {
        navNa.disabled = !isInitialComplete();
        if (!isInitialComplete()) {
            setNavClass(navNa, 'locked');
        } else {
            setNavClass(navNa, 'complete');
        }
    }

    // PROCESSES (mandatory once Initial is valid)
    if (navProcesses) {
        navProcesses.disabled = !isInitialComplete();
        if (!isInitialComplete()) {
            setNavClass(navProcesses, 'locked');
        } else if (processesComplete) {
            setNavClass(navProcesses, 'complete');
        } else {
            setNavClass(navProcesses, 'incomplete');
        }
    }

    // EXPORT (accessible once Initial is valid)
    if (navExport) {
        navExport.disabled = !isInitialComplete();
        if (!isInitialComplete()) {
            setNavClass(navExport, 'locked');
        } else if (exportReady) {
            setNavClass(navExport, 'complete');
        } else {
            setNavClass(navExport, 'incomplete');
        }
    }

    setCurrentNav(current);
}

/**
 * =================================================================================
 * FASE 4.2: GESTIÓN DE PROCESOS (IN-PAGE)
 * =================================================================================
 */

// 1. Mostrar Formulario (Crear o Editar)
function showProcessForm(id = null) {
    const formPanel = document.getElementById("process-form-container");
    const input = document.getElementById("process-name-input");
    const title = document.getElementById("form-title");

    formPanel.classList.remove("hidden");
    document.getElementById("btn-add-process").classList.add("hidden");

    if (id) {
        const proc = appState.processes.find(p => p.id === id);
        editingProcessId = id;
        input.value = proc.name;
        title.textContent = "Editar Proceso";
    } else {
        editingProcessId = null;
        input.value = "";
        title.textContent = "Registrar Nuevo Proceso";
    }
}

// 2. Ocultar Formulario
function hideProcessForm() {
    document.getElementById('process-form-container').classList.add('hidden');
    document.getElementById('btn-add-process').classList.remove('hidden');
    editingProcessId = null;
}

// 3. Guardar (Create/Update)
function saveProcess() {
  const nameInput = document.getElementById('process-name-input');
  const name = nameInput.value.trim();

  if (!editingProcessId && appState.processes.length >= PDF_MAX_PROCESSES) {
    alert("No puedes añadir más procesos. El PDF solo admite 30.");
    return;
  }

  if (!name) {
    alert("El nombre del proceso no puede estar vacío.");
    return;
  }

  if (editingProcessId) {
    // UPDATE
    const process = appState.processes.find(p => p.id === editingProcessId);
    if (process) {
      process.name = name;
    }

    saveAppState();
    hideProcessForm();
    renderProcesses();
    renderProcessesStatus();
    renderExportStatus();
    refreshMainNav();
    return;
  }

  // CREATE
  const newProcess = {
    id: Date.now(),
    name: name,
    modalSelections: [],       // intent state
    assignedRequirements: [],  // effective state
    lastPath: []
  };

  appState.processes.push(newProcess);

  saveAppState();
  hideProcessForm();
  renderProcesses();
  renderProcessesStatus();
  renderExportStatus();
  refreshMainNav();

  // Auto-open assignment modal for the newly created process
  openAssignmentModal(newProcess.id);
}

// 4. Eliminar
function deleteProcessUI(id) {
    if (confirm("¿Está seguro de eliminar este proceso? Se perderán los requisitos asignados.")) {
        appState.processes = appState.processes.filter(p => p.id !== id);
        saveAppState();
        renderProcesses();
        renderProcessesStatus();
        renderExportStatus();
        refreshMainNav();
    }
}

let initialListenersAttached = false;

function ensureDateContextHelp() {
    let help = document.getElementById('date-context-help');
    const dateInput = document.getElementById('input-date');

    if (!help && dateInput) {
        help = document.createElement('div');
        help.id = 'date-context-help';
        help.className = 'date-context-help';
        dateInput.insertAdjacentElement('afterend', help);
    }

    return help;
}

function renderDateContextHelp() {
    const help = ensureDateContextHelp();
    const dateValue = document.getElementById('input-date')?.value;

    if (!help) return;

    help.className = 'date-context-help';
    help.innerHTML = '';

    if (!dateValue) return;

    const selected = new Date(dateValue + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = today.getTime() - selected.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 15) {
        help.classList.add('notice');
        help.innerHTML = `La fecha seleccionada tiene más de 15 días. Verifique si aún corresponde.`;
        return;
    }

    if (diffDays < 0) {
        help.classList.add('future');
        help.innerHTML = `La fecha seleccionada está en el futuro. Verifique si corresponde.`;
        return;
    }
}

function renderInitial() {
    const orgInput = document.getElementById('input-org');
    const dateInput = document.getElementById('input-date');

    if (!initialListenersAttached) {
        if (orgInput) {
            orgInput.addEventListener('input', (e) => {
                appState.meta.organizationName = e.target.value;
                saveAppState();
                validateStep('sec-initial');
                renderDateContextHelp();
            });
        }

        if (dateInput) {
            dateInput.addEventListener('input', (e) => {
                appState.meta.reportDate = e.target.value;
                saveAppState();
                validateStep('sec-initial');
                renderDateContextHelp();
            });
        }

        initialListenersAttached = true;
    }

    if (orgInput) orgInput.value = appState.meta.organizationName || "";
    if (dateInput) dateInput.value = appState.meta.reportDate || "";

    renderDateContextHelp();
    validateStep('sec-initial');
}

function isLoadComplete() {
    return appState.navigate !== "" && appState.navigate !== "sec-load";
}

function getInitialSectionState() {
    const org = document.getElementById('input-org')?.value.trim() || "";
    const date = document.getElementById('input-date')?.value || "";

    // missing basic fields
    if (!org || !date || appState.Standards.size === 0) {
        return 'incomplete';
    }

    let hasMissing = false;
    let hasError = false;

    for (let index = 0; index < AVAILABLE_STANDARDS.length; index++) {
        const std = AVAILABLE_STANDARDS[index];
        if (!appState.Standards.has(std)) continue;

        const sel = document.getElementById(`sel-std-${index}`);
        const inp = document.getElementById(`inp-std-${index}`);

        if (!sel || !inp) {
            hasMissing = true;
            continue;
        }

        // selected standard but audit type not chosen yet
        if (sel.value === "" || sel.value === "N/A") {
            hasMissing = true;
            continue;
        }

        // auto-generated modes: if somehow empty, it's incomplete (not error)
        if (inp.disabled) {
            if (inp.value.trim() === "" || inp.value.trim() === "N/A") {
                hasMissing = true;
            }
            continue;
        }

        // manual modes (Seguimiento, Renovación, etc.)
        const val = inp.value.trim();

        // empty manual input => incomplete (yellow), not error
        if (val === "") {
            hasMissing = true;
            continue;
        }

        // non-empty but invalid => error (red)
        if (!validateCertificateFormat(val, std)) {
            hasError = true;
        }
    }

    if (hasError) return 'error';
    if (hasMissing) return 'incomplete';
    return 'complete';
}

function isInitialComplete() {
    return getInitialSectionState() === 'complete';
}

function hasInitialErrors() {
    return getInitialSectionState() === 'error';
}

function isProcessesComplete() {
    if (!appState.processes || appState.processes.length === 0) return false;

    return appState.processes.every(proc =>
        proc.name &&
        proc.name.trim() !== "" &&
        Array.isArray(proc.assignedRequirements) &&
        proc.assignedRequirements.length > 0
    );
}

function isDocumentReadyForFinalExport() {
    if (!isInitialComplete()) return false;
    if (!isProcessesComplete()) return false;
    if (getCrossModeConflicts().length > 0) return false;

    for (const std of appState.Standards) {
        const coverage = calculateStandardCoverage(std);
        if (coverage.total !== coverage.covered) return false;
    }

    return true;
}

// 5. Renderizado de Tarjetas
function renderProcesses() {
    //const grid = document.getElementById("process-grid");
    const grid = document.getElementById("process-grid");
    grid.innerHTML = "";

    const processCount = appState.processes.length;

    // Capacity Warning
    const warning = document.getElementById("process-capacity-warning");
    warning.classList.toggle("hidden", processCount < PDF_MAX_PROCESSES);

    // Hide Add Button when full
    document.getElementById("btn-add-process").disabled = processCount >= PDF_MAX_PROCESSES;

    if (processCount === 0) {
        grid.innerHTML = `
            <p style="color: #777; text-align:center; padding: 20px;">
                No hay procesos aún. Haz clic en <b>“Añadir Proceso”</b>.
            </p>
        `;
        return;
    }

    // Render Each Process Card
    appState.processes.forEach((proc) => {
        const assigned = proc.assignedRequirements.length;
        const statusClass =
            assigned === 0 ? "empty" :
            assigned > 0 ? "pending" :
            "complete";

        const card = document.createElement("div");
        card.className = "process-card-v2";

        card.innerHTML = `
            <div class="process-title-row">
                <div class="process-name">${proc.name}</div>
                <div class="process-actions">
                    <span class="process-btn-icon" onclick="openAssignmentModal(${proc.id})">📝</span>
                    <span class="process-btn-icon" onclick="showProcessForm(${proc.id})">✏️</span>
                    <span class="process-btn-icon" onclick="deleteProcessUI(${proc.id})">🗑️</span>
                </div>
            </div>

            <div class="process-status ${statusClass}">
                <span class="status-label">
                    ${
                        assigned === 0
                        ? "Sin requisitos asignados"
                        : assigned + " requisitos asignados"
                    }
                </span>
            </div>
        `;

        grid.appendChild(card);
    });

    renderProcessesStatus();
    renderExportStatus();
    refreshMainNav();
}

function renderProcessesStatus() {
    const container = document.getElementById('process-section-status');
    if (!container) return;

    if (!appState.processes || appState.processes.length === 0) {
        container.innerHTML = `<div class="missing-title">Procesos pendientes</div><div class="missing-std-block">Debes registrar al menos un proceso.</div>`;
        container.classList.remove('hidden');
        return;
    }

    const incomplete = appState.processes.filter(proc =>
        !proc.assignedRequirements || proc.assignedRequirements.length === 0
    );

    if (incomplete.length > 0) {
        container.innerHTML = `
            <div class="missing-title">Procesos incompletos</div>
            ${incomplete.map(p => `<div class="missing-std-block">• ${p.name || 'Proceso sin nombre'} no tiene requisitos asignados.</div>`).join('')}
        `;
        container.classList.remove('hidden');
        return;
    }

    container.classList.add('hidden');
    container.innerHTML = '';
}

function renderExportStatus() {
    const container = document.getElementById('export-validation-status');
    if (!container) return;

    const messages = [];

    if (!isInitialComplete()) {
        messages.push("La información general aún está incompleta.");
    }

    if (!appState.processes || appState.processes.length === 0) {
        messages.push("Debes registrar al menos un proceso.");
    } else {
        const incomplete = appState.processes.filter(p => !p.assignedRequirements || p.assignedRequirements.length === 0);
        if (incomplete.length > 0) {
            messages.push("Existen procesos sin requisitos asignados.");
        }
    }

    const conflicts = getCrossModeConflicts();
    if (conflicts.length > 0) {
        messages.push("Existen conflictos entre requisitos aplicables y no aplicables.");
    }

    for (const std of appState.Standards) {
        const coverage = calculateStandardCoverage(std);
        if (coverage.total !== coverage.covered) {
            messages.push(`${std} aún tiene cláusulas pendientes por asignar.`);
        }
    }

    if (messages.length === 0) {
        container.innerHTML = `
            <h3 style="margin-top:0; color:#155724;">Documento validado</h3>
            <p style="margin-bottom:0;">El documento está completo y listo para exportarse como salida final.</p>
        `;
        return;
    }

    container.innerHTML = `
        <h3 style="margin-top:0; color:#856404;">Documento aún no validado</h3>
        <div>
            ${messages.map(msg => `<div style="margin-bottom:6px;">• ${msg}</div>`).join('')}
        </div>
    `;
}

/**
 * =================================================================================
 * FASE 4: MOTOR DE BÚSQUEDA Y LÓGICA DE SELECCIÓN (CORE REENGINEERING)
 * =================================================================================
 */

let tempSelectedClauses = new Set(); // Formato: "Standard|Clause"

// // Integramos esto en la inicialización existente
// const originalInit = initKnowledgeBase;
// initKnowledgeBase = function() {
//     originalInit(); // Ejecuta la indexación plana original
// };

/**
 * =================================================================================
 * UTILIDADES DE PERSISTENCIA
 * =================================================================================
 */
function saveAppState() {
  const stateToSave = {
    meta: appState.meta,
    standards: Array.from(appState.Standards),
    standardDetails: appState.standardDetails,
    processes: appState.processes,
    nonApplicableClauses: appState.nonApplicableClauses,
    nonApplicableIntent: appState.nonApplicableIntent,
    lastPath: appState.lastPath,
    naLastPath: appState.naLastPath,
    navigate: appState.navigate
  };

  localStorage.setItem('isoSpaState', JSON.stringify(stateToSave));
}

function loadAppState() {
  const saved = localStorage.getItem('isoSpaState');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      appState.meta = parsed.meta ?? appState.meta;
      appState.Standards = new Set(parsed.standards ?? []);
      appState.standardDetails = parsed.standardDetails ?? {};
      appState.processes = (parsed.processes ?? []).map(proc => ({
        ...proc,
        modalSelections: proc.modalSelections ?? [],
        assignedRequirements: proc.assignedRequirements ?? [],
        lastPath: proc.lastPath ?? []
      }));
      appState.nonApplicableClauses = parsed.nonApplicableClauses ?? [];
      appState.nonApplicableIntent = parsed.nonApplicableIntent ?? [];
      appState.lastPath = parsed.lastPath ?? [];
      appState.naLastPath = parsed.naLastPath ?? [];
      appState.navigate = parsed.navigate ?? 'sec-load';
    } catch (e) {
      console.error("Error cargando estado:", e);
    }
  }
}

/* ======================================================
   PHASE 3 — CROSS VALIDATION ENGINE
   Process <-> Non Applicable (two-way, hierarchical)
====================================================== */

function getCurrentMode() {
    return currentProcessId === 'NA_MODE' ? 'na' : 'process';
}

function getOppositeMode() {
    return getCurrentMode() === 'na' ? 'process' : 'na';
}

function getAllProcessSelectionsByStandard(std) {
    const set = new Set();

    appState.processes.forEach(proc => {
        (proc.assignedRequirements || []).forEach(req => {
            const [reqStd, clause] = req.split('\n');
            if (reqStd === std) set.add(clause);
        });
    });

    return set;
}

function getAllNaSelectionsByStandard(std) {
    const set = new Set();

    (appState.nonApplicableClauses || []).forEach(req => {
        const [reqStd, clause] = req.split('\n');
        if (reqStd === std) set.add(clause);
    });

    return set;
}

/**
 * Validation when selecting a clause in PROCESS mode
 * Process cannot be same as or descendant of any NA clause
 */
function validateProcessSelection(std, candidateClause) {
    const naSet = getAllNaSelectionsByStandard(std);

    for (const naClause of naSet) {
        if (processConflictsWithNa(std, candidateClause, naClause)) {
            return {
                allowed: false,
                blocker: naClause,
                message: `${std} ${candidateClause} no puede asignarse al proceso porque entra en conflicto con ${naClause}, declarada como No Aplicable.`
            };
        }
    }

    return {
        allowed: true,
        blocker: null,
        message: ""
    };
}

/**
 * True if processClause is the same as naClause
 * OR processClause is a descendant of naClause
 */
function processConflictsWithNa(std, processClause, naClause) {
  if (processClause === naClause) return true;
  const stdData = nm_NORM_DATA[std] || {};
  const p = stdData[processClause];
  if (!p) return false;
  return (p.ancestors || []).includes(naClause);
}

/**
 * Validation when selecting a clause in NA mode
 * NA cannot be:
 * - the same clause as a Process clause
 * - an ancestor of an already selected Process clause
 *
 * This preserves:
 * Process = 8.5, NA = 8.5.1  ✅
 * Process = 8.5.1.f, NA = 8.5.1 ❌
 */
function validateNaSelection(std, candidateClause) {
    const processSet = getAllProcessSelectionsByStandard(std);
    const stdData = nm_NORM_DATA[std] || {};

    for (const processClause of processSet) {
        // Exact same clause => block
        if (candidateClause === processClause) {
            return {
                allowed: false,
                blocker: processClause,
                message: `${std} ${candidateClause} no puede declararse como No Aplicable porque ya está asignada a un proceso.`
            };
        }

        // If candidate NA is an ancestor of an existing process clause => block
        const processData = stdData[processClause];
        if (processData && (processData.ancestors || []).includes(candidateClause)) {
            return {
                allowed: false,
                blocker: processClause,
                message: `${std} ${candidateClause} no puede declararse como No Aplicable porque sería más amplia que ${processClause}, ya asignada a un proceso.`
            };
        }
    }

    return {
        allowed: true,
        blocker: null,
        message: ""
    };
}

function canSelectClauseInCurrentMode(std, clauseCode) {
    if (getCurrentMode() === 'na') {
        return validateNaSelection(std, clauseCode);
    }
    return validateProcessSelection(std, clauseCode);
}

/**
 * Returns true when this clause can be part of the effective assignment
 * in the CURRENT modal mode.
 *
 * In PROCESS mode:
 *   - excludes clauses locked by Non Applicable
 *
 * In NA mode:
 *   - excludes clauses locked by Process assignments
 */
function isClauseEffectivelyAllowed(std, clauseCode) {
  const validation = canSelectClauseInCurrentMode(std, clauseCode);
  return validation.allowed;
}

function getIntentClauses(std, set = markedClauses[std]) {
  return getMarkedRoots(std, set);
}

/**
 * Returns the top-most marked roots for a standard.
 * A root is any marked clause whose parent is NOT marked.
 */
function getMarkedRoots(std, set = markedClauses[std]) {
  if (!set || set.size === 0) return [];

  const stdData = nm_NORM_DATA[std] || {};

  return Array.from(set)
    .filter(code => {
      const parent = stdData[code]?.parent;
      return !parent || !set.has(parent);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/**
 * Recursive collector for the EFFECTIVE bucket representation.
 *
 * Rules:
 * - If a node is not marked, it contributes nothing.
 * - If a node is marked but has NO marked children, it contributes itself.
 * - A parent can collapse to itself ONLY if all of its direct children are marked
 *   and all child subtrees are also fully collapsible.
 * - If even ONE child is missing (for example because it is locked by NA),
 *   the parent cannot collapse and we expand into the child results instead.
 *
 * This is exactly what avoids showing "8" when "8.3" is intentionally excluded.
 */
function collectEffectiveBucketForNode(std, clauseCode, set = markedClauses[std]) {
  const stdData = nm_NORM_DATA[std] || {};
  const node = stdData[clauseCode];

  if (!node || !set || !set.has(clauseCode)) {
    return {
      canCollapse: false,
      codes: []
    };
  }

  const children = (node.children || []).filter(child => stdData[child]);

  // Leaf node
  if (children.length === 0) {
    return {
      canCollapse: true,
      codes: [clauseCode]
    };
  }

  // Recurse into marked children only
  const childResults = children.map(child => {
    if (!set.has(child)) {
      return {
        canCollapse: false,
        codes: []
      };
    }

    return collectEffectiveBucketForNode(std, child, set);
  });

  const allDirectChildrenMarked = children.every(child => set.has(child));
  const allChildSubtreesCollapsible = childResults.every(r => r.canCollapse);

  // Parent can collapse ONLY if every direct child exists in the effective tree
  if (allDirectChildrenMarked && allChildSubtreesCollapsible) {
    return {
      canCollapse: true,
      codes: [clauseCode]
    };
  }

  // Otherwise expand into the children
  return {
    canCollapse: false,
    codes: childResults.flatMap(r => r.codes)
  };
}

/**
 * Returns the final EFFECTIVE bucket clauses for a standard.
 * This is what should be used for:
 * - Row 3 bucket display
 * - autosave flattenedReqs
 *
 * It is intentionally conflict-aware and does NOT blindly collapse
 * a parent when there are locked / excluded holes inside its subtree.
 */
function getEffectiveBucketClauses(std, set = markedClauses[std]) {
  if (!set || set.size === 0) return [];

  const roots = getMarkedRoots(std, set);
  const result = roots.flatMap(root =>
    collectEffectiveBucketForNode(std, root, set).codes
  );

  return result.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
}

function getOppositeSelectionsByStandard(std) {
    if (getCurrentMode() === 'na') {
        return getAllProcessSelectionsByStandard(std);
    }
    return getAllNaSelectionsByStandard(std);
}

function getCrossModeConflicts() {
    const conflicts = [];

    appState.processes.forEach(proc => {
        (proc.assignedRequirements || []).forEach(req => {
            const [std, processClause] = req.split('\n');

            (appState.nonApplicableClauses || []).forEach(naReq => {
                const [naStd, naClause] = naReq.split('\n');

                if (std !== naStd) return;

                if (processConflictsWithNa(std, processClause, naClause)) {
                    conflicts.push({
                        std,
                        processId: proc.id,
                        processName: proc.name,
                        processClause,
                        naClause
                    });
                }
            });
        });
    });

    const seen = new Set();
    return conflicts.filter(item => {
        const key = `${item.std}|${item.processId}|${item.processClause}|${item.naClause}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function renderNaSummary() {
    const container = document.getElementById("na-summary-content");
    if (!container) return;

    if (!appState.nonApplicableClauses || appState.nonApplicableClauses.length === 0) {
        container.innerHTML = `No hay exclusiones definidas.`;
        return;
    }

    const grouped = {};
    appState.nonApplicableClauses.forEach(req => {
        const [std, clause] = req.split('\n');
        if (!grouped[std]) grouped[std] = new Set();
        grouped[std].add(clause);
    });

    let html = "";
    Object.keys(grouped).forEach(std => {
        const clauses = Array.from(grouped[std]).sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true })
        );

        html += `
            <div class="na-summary-block">
                <span class="na-summary-title">${std}:</span>
                <span>${clauses.join(", ")}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderCrossConflictBanner() {
    const banner = document.getElementById("cross-conflict-banner");
    if (!banner) return;

    const conflicts = getCrossModeConflicts();

    if (conflicts.length === 0) {
        banner.classList.add("hidden");
        banner.innerHTML = "";
        return;
    }

    const preview = conflicts.slice(0, 5).map(c =>
        `<div>• ${c.std}: proceso <strong>${c.processName}</strong> usa <strong>${c.processClause}</strong> y NA contiene <strong>${c.naClause}</strong></div>`
    ).join("");

    const more = conflicts.length > 5
        ? `<div style="margin-top:6px;">Y ${conflicts.length - 5} conflicto(s) más...</div>`
        : "";

    banner.innerHTML = `
        Se detectaron conflictos entre requisitos aplicables y no aplicables.
        ${preview}
        ${more}
        <div style="margin-top:8px; font-weight:700;">
            Debes resolverlos antes de considerar el documento válido.
        </div>
    `;
    banner.classList.remove("hidden");
}

function showToast(message, timeout = 3200) {
    const toast = document.getElementById("app-toast");
    if (!toast) {
        alert(message);
        return;
    }

    toast.innerHTML = message;
    toast.classList.remove("hidden");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
        toast.classList.add("hidden");
    }, timeout);
}

/**
 * =================================================================================
 * FASE 3.C: MONITOR DE ESTADO NORMATIVO (SLIM BAR)
 * =================================================================================
 */

function updateSlimBar() {
    const container = document.getElementById('slim-bar-status');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (appState.Standards.size === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    coveredSet = new Set();
    appState.Standards.forEach(std => {
        const { total, covered } = calculateStandardCoverage(std);
        
        let stateClass = 'status-gray'; // Completamente vacía [cite: 46]
        if (covered === total && total > 0) {
            stateClass = 'status-green'; // Cobertura total [cite: 48]
        } else if (covered > 0) {
            stateClass = 'status-orange'; // Contenido parcial [cite: 47]
        }
        
        const segment = document.createElement('div');
        segment.className = `slim-segment ${stateClass}`;
        segment.title = `${std}: ${covered} de ${total} cláusulas completadas`;
        segment.innerText = std; // Nombres de las normas seleccionadas [cite: 44]
        
        container.appendChild(segment);
    });
    renderMissingRequirements();
}

function calculateStandardCoverage(std) {
    const clauses = nm_NORM_DATA[std] || {};
    const leafClauses = Object.keys(clauses).filter(key => clauses[key].children.length === 0);
    const totalLeaves = leafClauses.length;

    if (totalLeaves === 0) return { total: 0, covered: 0 };

    const processReqs = [];
    appState.processes.forEach(proc => {
        (proc.assignedRequirements || []).forEach(req => processReqs.push(req));
    });

    const naReqs = appState.nonApplicableClauses || [];

    const coveredProcess = expandStoredClausesForStandard(std, processReqs);
    const coveredNA = expandStoredClausesForStandard(std, naReqs);

    coveredSet = new Set([...coveredProcess, ...coveredNA]);
    coveredStd[std] = coveredSet;

    let coveredCount = 0;
    leafClauses.forEach(leaf => {
        if (coveredSet.has(leaf)) coveredCount++;
    });

    return { total: totalLeaves, covered: coveredCount };
}

/* --- FASE 3.D: REQUISITOS FALTANTES (VISTA RESUMIDA) --- */

function renderMissingRequirements() {
    const container = document.getElementById('missing-requirements-summary');
    if (!container) return;

    // Si no hay normas, ocultar
    if (appState.Standards.size === 0) {
        container.classList.add('hidden');
        return;
    }

    let html = '';
    let hasMissing = false;

    appState.Standards.forEach(std => {
        // 1. Obtener todas las cláusulas base de esta norma
        // const allStdChapters = Object.keys(nm_NORM_DATA).filter(key => nm_NORM_DATA[key].standards.includes(std) && !nm_NORM_DATA[key].parent);
        // let allStdClauses = [];
        // allStdChapters.forEach(clause => {
        //     allStdClauses.push(...nm_NORM_DATA[clause].children.filter(c => nm_NORM_DATA[c].standards.includes(std)));
        // });
        const stdData = nm_NORM_DATA[std] || {};
        // const allStdChapters = Object.keys(stdData).filter(key => !stdData[key].parent);

        let allStdClauses = [];
        // allStdClauses = Object.keys(stdData).filter(key => stdData[key].parent).reverse();
        allStdClauses = Object.keys(stdData).reverse();
        // allStdChapters.forEach(clause => {
        //     // Just grab all children for this chapter directly
        //     allStdClauses.push(...(stdData[clause].children || []));
        // });
        // // 2. Extraer todo lo que ya está cubierto (Procesos + No Aplicables)
        // const coveredSet = new Set();
        // appState.processes.forEach(proc => {
        //     proc.assignedRequirements.forEach(reqKey => {
        //         const [reqStd, clause] = reqKey.split('|');
        //         if (reqStd === std) coveredSet.add(clause);
        //     });
        // });
        // (appState.nonApplicableClauses || []).forEach(reqKey => {
        //     const [reqStd, clause] = reqKey.split('|');
        //     if (reqStd === std) coveredSet.add(clause);
        // });

        // 3. Determinar las cláusulas faltantes
        const missingClauses = new Set();
        allStdClauses.forEach(clause => {
            let childCovered = false;
            stdData[clause].children.forEach(child => {
                if (coveredStd[std].has(child)) {
                    childCovered = true;
                }
            });
            if (!coveredStd[std].has(clause) && !childCovered) {
                missingClauses.add(clause);
            }
        });

        if (missingClauses.size > 0) {
            hasMissing = true;
            
            // 4. LÓGICA DE RESUMEN: Solo mostrar el "padre" faltante
            const rolledUpMissing = [];
            missingClauses.forEach(clause => {
                const parent = stdData[clause].parent;
                // Si la cláusula no tiene padre, o su padre NO falta (está cubierto), la agregamos.
                // Si el padre también falta, ignoramos este hijo para evitar saturación visual.
                if (!parent || !missingClauses.has(parent)) {
                    rolledUpMissing.push(clause);
                }
            });
            // Ordenamos lógicamente (ej. 4.1 antes que 4.10)
            rolledUpMissing.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

            html += `
                <div class="missing-std-block">
                    <span class="missing-std-title">${std}:</span>
                    <span class="missing-std-clauses">${rolledUpMissing.join(', ')}</span>
                </div>
            `;
        }
    });

    // 5. Renderizar o esconder el contenedor
    if (hasMissing) {
        container.innerHTML = `<div class="missing-title">Requisitos Pendientes por Asignar:</div>${html}`;
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
        container.innerHTML = '';
    }
}

function expandStoredClausesForStandard(std, storedReqs) {
    const stdData = nm_NORM_DATA[std] || {};
    const expanded = new Set();

    storedReqs.forEach(reqKey => {
        const [reqStd, clause] = reqKey.split('\n');
        if (reqStd !== std) return;

        expanded.add(clause);

        const descendants = stdData[clause]?.descendants || [];
        descendants.forEach(desc => expanded.add(desc));
    });

    return expanded;
}

/**
 * =================================================================================
 * FASE 4 & 5: PUENTE CON EL NUEVO MODAL SPA
 * =================================================================================
 */

// --- AUTO-SAVE MODAL ARCHITECTURE ---

let currentProcessId = null;
const newProcess = {
  id: Date.now(),
  name: name,
  assignedRequirements: [],
  lastPath: []
};

function autoSaveModalState() {
  if (!currentProcessId || isHydratingModal) return;

  let intentReqs = [];
  let effectiveReqs = [];

  for (const std in markedClauses) {
    const intentClauses = getIntentClauses(std);
    const effectiveClauses = getEffectiveBucketClauses(std);

    intentClauses.forEach(clause => {
      intentReqs.push(`${std}\n${clause}`);
    });

    effectiveClauses.forEach(clause => {
      effectiveReqs.push(`${std}\n${clause}`);
    });
  }

  if (currentProcessId === 'NA_MODE') {
    appState.nonApplicableIntent = intentReqs;
    appState.nonApplicableClauses = effectiveReqs;
    appState.naLastPath = [...currentPath];
    saveAppState();
  } else {
    const process = appState.processes.find(p => p.id === currentProcessId);
    if (process) {
      process.name = document.getElementById('nm-process-title').value;
      process.modalSelections = intentReqs;
      process.assignedRequirements = effectiveReqs;
      process.lastPath = [...currentPath];
      saveAppState();
    }
  }

  updateSlimBar();
  renderNaSummary();
  renderCrossConflictBanner();
  renderProcesses();
  renderProcessesStatus();
  renderExportStatus();
  refreshMainNav();
}

function autoSaveProcessName() {
    if (currentProcessId !== 'NA_MODE') autoSaveModalState();
}

function openAssignmentModal(procId) {
  const process = appState.processes.find(p => p.id === procId);
  if (!process) return;

  hydrateModal({
    processId: procId,
    title: process.name,
    titleLocked: false,
    lastPath: process.lastPath,
    flattenedReqs: process.modalSelections?.length
      ? process.modalSelections
      : process.assignedRequirements
  });
}

function resetModalTransientState() {
  currentPath = [];
  markedClauses = {};
  currentProcessId = null;
}

function restoreModalSelections(flattenedReqs = []) {
  markedClauses = {};

  flattenedReqs.forEach(req => {
    const [std, clause] = req.split('\n');

    if (!std || !clause) return;
    if (!isValidForStd(clause, std)) return;

    markClauseAndAscendants(clause, std);
  });
}

function openNaModal() {
  hydrateModal({
    processId: 'NA_MODE',
    title: "Requisitos No Aplicables",
    titleLocked: true,
    lastPath: appState.naLastPath,
    flattenedReqs: appState.nonApplicableIntent?.length
      ? appState.nonApplicableIntent
      : appState.nonApplicableClauses
  });
}

function closeModal() {
  document.getElementById('new-requirements-modal').classList.add('hidden');

  resetModalTransientState();
  updateModalUI();

  renderProcesses();
  renderNaSummary();
  renderCrossConflictBanner();
  renderProcessesStatus();
  renderExportStatus();
  refreshMainNav();
}
