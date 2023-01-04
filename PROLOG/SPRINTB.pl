%set_prolog_flag(answer_write_options,[max_depth(0)]).
% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object data(time:number, places:list).
:- json_object list(viagens:list).

% Relaï¿½ï¿½o entre pedidos HTTP e predicados que os processam
:- http_handler('/create_path',path_creator, []).
:- http_handler('/planning', p_json, []).
:- http_handler('/travels', get_travels, []).

% Criaï¿½ï¿½o de servidor HTTP no porto 'Port'
server() :-
        http_server(http_dispatch, [port(5000)]).

path_creator(Request):-
  http_parameters(Request,
                    [ truck(TRUCK, []),
                      date(DATE, [between(20220101,20221231)])
                    ]),
  voltamaiscedo(TRUCK,DATE,T,L),
  %json_write(STREAM,point{T,L}),
  format('Content-type: text/plain~n~n'),
  format('time: ~2f~nplances: ~w',[T,L]).

p_json(Request) :-
        http_read_json(Request, JSON),
        json_to_prolog(JSON, JSON_TEXT),
%        format('Content-type: text/plain~n~n'),
%        format('~w~n', JSON_TEXT),
        split(JSON_TEXT,TRUCK,DATE),
%        format('~w ~n~w', [TRUCK, DATE]),
        voltamaiscedo(TRUCK,DATE,T,L),
%        format('~2f ~n~w', [T, L]).
        D = data(T,L),
%        format('~w', [D]),
        prolog_to_json(D, X),
        reply_json(X).

get_travels(Request) :-
        http_read_json(Request, JSON),
        json_to_prolog(JSON, JSON_TEXT),
        split_date(JSON_TEXT,DATE),
%em caso de erro, pode estar no split_date pois n sei o formato se esta certo
        atribuicao_lote(DATE,L),
        D = list(L),
        prolog_to_json(D, X),
        reply_json(X).

split(json([truckId=X,date=Y]),X,Y).
split_date(json([date=Y]),Y).


%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>).
entrega(4439, 20221205, 200, 1, 8, 10).
entrega(4438, 20221205, 150, 9, 7, 9).
entrega(4445, 20221205, 100, 3, 5, 7).
entrega(4443, 20221205, 120, 8, 6, 8).
entrega(4449, 20221205, 300, 11, 15, 20).
entrega(4398, 20221205, 310, 17, 16, 20).
%entrega(4432, 20221205, 270, 14, 14, 18).
%entrega(4437, 20221205, 180, 12, 9, 11).
%entrega(4451, 20221205, 220, 6, 9, 12).
%entrega(4452, 20221205, 390, 13, 21, 26).
%entrega(4444, 20221205, 380, 2, 20, 25).

%entrega(4455, 20221205, 280, 7, 14, 19).
%entrega(4399, 20221205, 260, 15, 13, 18).
%entrega(4454, 20221205, 350, 10, 18, 22).
%entrega(4446, 20221205, 260, 4, 14, 17).
%entrega(4456, 20221205, 330, 16, 17, 21).
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,100,60).
carateristicasCam(eTruck02,7500,4300,80,100,60).
carateristicasCam(eTruck03,7500,4300,80,100,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).

cidade_inicial(5).
% comeï¿½ar no armazem origem e verificar dos armazï¿½ns da lista o que estï¿½
% mais proximo.Depois, retirar esse armazï¿½m da lista e fazer o mesmo a
% comeï¿½ar neste armazï¿½m.

atribuicao_lote(DATE,LISTA_FINAL):-
        lista_entregas(LISTA_ENTREGAS,DATE),
        lista_camioes(LISTA_CAMIOES),
        associate_delivery_with_cam(LISTA_CAMIOES, LISTA_ENTREGAS,LISTA_FINAL).

lista_camioes(L):-findall(A,carateristicasCam(A,_,_,_,_,_),L).
lista_entregas(L, DATE):-findall(A,entrega(A,DATE,_,_,_,_),L).

associate_delivery_with_cam(Camioes, Entregas, Pares_finais):-
        findall((Camiao,Delivery),associate_delivery_with_cam(Camioes,Entregas,Camiao,Delivery),Pares),
        organize_pairs(Pares,Pares_distribuidos),
        flatten_pairs(Pares_distribuidos,Pares_finais).

associate_delivery_with_cam(Cams, Deliveries, Cam, Delivery) :-
    length(Cams, NumCams),
    nth0(Index, Deliveries, Delivery),
    nth0(CamsIndex, Cams, Cam),
    CamsIndex is Index mod NumCams.

organize_pairs(Pairs, Organized_pairs) :-
    organize_pairs(Pairs, [], Organized_pairs).

organize_pairs([], Acc, Acc).
organize_pairs([(Cam, Delivery)|T], Acc, Organized_pairs) :-
    (member((Cam, Delivery_list), Acc),
     !,
     append(Delivery_list, [Delivery], New_delivery_list),
     select((Cam, _), Acc, New_acc),
     New_acc2 = [(Cam, New_delivery_list)|New_acc]
    ;
     New_acc2 = [(Cam, [Delivery])|Acc]),
    organize_pairs(T, New_acc2, Organized_pairs).

flatten_pairs(Organized_pairs, Flattened_pairs) :-
    maplist(flatten_pair, Organized_pairs, Flattened_pairs).

flatten_pair((Cam, Delivery_list), Flattened_pair) :-
    Flattened_pair = [Cam|Delivery_list].


combinacao_heuristicas(DATE,[A|LF],F):-get_time(Ti),findall([M,C],entrega(_,DATE,M,C,_,_),LCM),findall(C,entrega(_,DATE,_,C,_,_),LC1),
        cidade_inicial(A),createList(LC1,A,LC),combinar(LC1,LC,LCM,LF2),append(LF2,[A],LF),carateristicasCam(eTruck01,T,CM,_,_,_),
        tempo([A|LF],DATE,T,CM,F),get_time(Tf),TSol is Tf-Ti,write('Tempo de Execução = '),write(TSol).

combinar([],[],[],[]):-!.
combinar(LC1,LC,LCM,[CF|LF]):- best_city(LC,LCM,CF),delete(LCM,[_,CF],LF2),delete(LC1,CF,LC2),createList(LC2,CF,LC3),combinar(LC2,LC3,LF2,LF).
best_city([[T1,C1],[T2,C2]|L1],[[M1,C1],[M2,C2]|L2],L):-F1 is T1*M1,F2 is M2*T2,F1<F2,best_city([[T1,C1]|L1],[[M1,C1]|L2],L);
        best_city([[T2,C2]|L1],[[M2,C2]|L2],L).
best_city([[_,A]],[[_,A]],A).



closest_path(DATE,[A|LF],F):-get_time(Ti),findall(C,entrega(_,DATE,_,C,_,_),LC),cidade_inicial(A),closest(LC,A,LF2),append(LF2,[A],LF),
        carateristicasCam(eTruck01,T,CM,_,_,_),tempo([A|LF],DATE,T,CM,F),get_time(Tf),TSol is Tf-Ti,write('Tempo de Execução = '),write(TSol).

closest([],_,[]):-!.
closest(LC,CI,[CF|LF]):-close_city(LC,CI,CF),delete(LC,CF,LF2),closest(LF2,CF,LF).
close_city(LC,CI,CF):-createList(LC,CI,LF),minlista(LF,CF).
createList([C|LC],CI,[[CF,C]|LF]):-dadosCam_t_e_ta(_,CI,C,CF,_,_),createList(LC,CI,LF).
createList([],_,[]).
minlista([[_,A]],A).
minlista([[A,C1],[B,_]|C],L):- A<B,minlista([[A,C1]|C],L).
minlista([[_,_],[B,C1]|C],L):-minlista([[B,C1]|C],L).
maxlista([[_,A]],A).
maxlista([[A,C1],[B,_]|C],L):- A>B,maxlista([[A,C1]|C],L).
maxlista([[_,_],[B,C1]|C],L):-maxlista([[B,C1]|C],L).

biggest_weight(DATE,[A|LF],F):-get_time(Ti),findall([M,C],entrega(_,DATE,M,C,_,_),LCM),cidade_inicial(A),heaviest(LCM,LF2),append(LF2,[A],LF),
        carateristicasCam(eTruck01,T,CM,_,_,_),tempo([A|LF],DATE,T,CM,F),get_time(Tf),TSol is Tf-Ti,write('Tempo de Execução = '),write(TSol).

heaviest([],[]):-!.
heaviest(LCM,[CF|LF]):-maxlista(LCM,CF),delete(LCM,[_,CF],LF2),heaviest(LF2,LF).

tempo(LC,DATE,TARA,CMAX,F):-PMAX is TARA + CMAX,somatorio(DATE,TARA,PREAL),bateriamaxima(eTruck01,BMAX),bateriaminima(eTruck01,BMIN),
    trata_lista(LC,F,PMAX,PREAL,BMAX,BMIN,80,eTruck01,DATE).
somatorio(DATE,TARA,PR):-findall(M,entrega(_,DATE,M,_,_,_),L),sumlist(L,LS),PR is LS+TARA.

listaentregas(E,DIA):-findall(A,entrega(_,DIA,_,A,_,_),E).

metodo([],_,[]).
metodo([H|T],M,[H2|F]):-append([M|H], [M], H2), metodo(T,M,F).

calcula_trajetoria(LT,DIA):-partida_chegada(PC),listaentregas(LA,DIA), findall(LAC, permutation(LA, LAC), LT2), metodo(LT2, PC, LT).

partida_chegada(5).

% agrega os predicados, recebendo todas as
% trajetorias possiveis para os caminhos dados, devolve o caminho mais
% rapido e o respetivo tempo

% voltamaiscedo(TRUCK,DIA,TEMPOFINAL,LFINAL):-get_time(Ti),carateristicasCam(TRUCK,_,_,BATINICIAL,_,_),bateriamaxima(TRUCK,BATMAX),bateriaminima(TRUCK,BATMIN),pesomaximo(TRUCK,PESOMAXIMO),pesototal(TRUCK,PESOTOTAL),calcula_trajetoria([A|LT],DIA),trata_lista(A,TEMPO,PESOMAXIMO,PESOTOTAL,BATMAX,BATMIN,BATINICIAL,TRUCK,DIA),itera(DIA,TRUCK,BATINICIAL,BATMAX,BATMIN,PESOMAXIMO,PESOTOTAL,LT,TEMPO,A,LFINAL),!,trata_lista(LFINAL,TEMPOFINAL,PESOMAXIMO,PESOTOTAL,BATMAX,BATMIN,BATINICIAL,TRUCK,DIA),get_time(Tf),TSol
% is Tf-Ti,write('Tempo de ExecuÃ§Ã£o = '),write(TSol).

voltamaiscedo(TRUCK,DIA,TEMPOFINAL,LFINAL):-
        %get_time(Ti),
        findall(C,entrega(_,DIA,_,C,_,_),LC),length(LC,LENGTH),
        (LENGTH<9 ->(carateristicasCam(TRUCK,_,_,BATINICIAL,_,_),bateriamaxima(TRUCK,BATMAX),bateriaminima(TRUCK,BATMIN),pesomaximo(TRUCK,PESOMAXIMO),
        pesototal(TRUCK,PESOTOTAL),calcula_trajetoria([A|LT],DIA),
        trata_lista(A,TEMPO,PESOMAXIMO,PESOTOTAL,BATMAX,BATMIN,BATINICIAL,TRUCK,DIA),
        itera(DIA,TRUCK,BATINICIAL,BATMAX,BATMIN,PESOMAXIMO,PESOTOTAL,LT,TEMPO,A,LFINAL),!,
        trata_lista(LFINAL,TEMPOFINAL,PESOMAXIMO,PESOTOTAL,BATMAX,BATMIN,BATINICIAL,TRUCK,DIA));(closest_path(DIA,LFINAL,TEMPOFINAL))).
%        ,get_time(Tf),TSol is Tf-Ti,write('Tempo de Execução =
%        '),write(TSol).


% itera ï¿½ o metodo que trata de todos os caminhos possï¿½veis, e envia
% cada caminho ao trata_lista que lhe retorna o tempo de cada caminho,
% sendo o itera responsavel por devolver o caminho que demora menos
% tempo

itera(DIA,TRUCK,BATINICIAL,BATMAX,BATMIN,PESOMAXIMO, PESOTOTAL,[A|B], TMP, CAMINHO,AS):-is_list(A), trata_lista(A,TEMPOA,PESOMAXIMO,PESOTOTAL,BATMAX,BATMIN,BATINICIAL,TRUCK,DIA), (TMP>TEMPOA,itera(DIA,TRUCK,BATINICIAL,BATMAX,BATMIN,PESOMAXIMO,PESOTOTAL,B,TEMPOA,A,AS));itera(DIA,TRUCK,BATINICIAL,BATMAX,BATMIN,PESOMAXIMO,PESOTOTAL,B,TMP,CAMINHO,AS).
itera(_,_,_,_,_,_,_,[],_,T,T).

trata_lista([A,B|C],TEMPO,PESOMAXIMO,PESOCAMIAO,BATMAX,BATMIN,BATATUAL,TRUCK,DIA):-dadosCam_t_e_ta(_,A,B,T,E,_),
(entrega(_,DIA,MASSAENTREGA,B,_,TEMPORET);MASSAENTREGA is 0, TEMPORET is 0),
PESODESCARGA is PESOCAMIAO-MASSAENTREGA,tempoouenergiautil(PESOCAMIAO,PESOMAXIMO,E,ENERGIAUTIL),(BATATUAL-ENERGIAUTIL>BATMIN,
BATAPOSVIAJ is BATATUAL-ENERGIAUTIL;BATAPOSVIAJ is BATMIN),
(member(NEXTSTOP,C),dadosCam_t_e_ta(_,B,NEXTSTOP,_,BATNEC,TA),tempoouenergiautil(PESODESCARGA,PESOMAXIMO,BATNEC,BATUTNEC),
(BATAPOSVIAJ-BATMIN>BATUTNEC,TEMPOACONSIDERAR is TEMPORET,NOVABAT is BATAPOSVIAJ,TEMPOADICIONAL is 0;(BATUTNEC<BATMAX-BATMIN,TEMPOADICIONAL is 0;TEMPOADICIONAL is TA),temporecarregamentoparcial(TRUCK,BATAPOSVIAJ,TEMPORECARREGAR,NEXTSTOP,BATUTNEC),
tempoaconsiderar(TEMPORECARREGAR,TEMPORET,TEMPOACONSIDERAR),NOVABAT is BATMAX);TEMPOACONSIDERAR is TEMPORET,TEMPOADICIONAL is 0),
trata_lista([B|C],D1,PESOMAXIMO,PESODESCARGA,BATMAX,BATMIN,NOVABAT,TRUCK,DIA),!,
tempoouenergiautil(PESOCAMIAO,PESOMAXIMO,T,TEMPOUTIL),TEMPO is D1+TEMPOUTIL+TEMPOACONSIDERAR+TEMPOADICIONAL.
trata_lista([_],0,_,_,_,_,_,_,_).

pesomaximo(TRUCK,PESOMAXIMO):-carateristicasCam(TRUCK,A,B,_,_,_),PESOMAXIMO is A+B.

pesototal(TRUCK,PESOTOTAL):-findall(A,entrega(_,_,A,_,_,_),E),sumlist(E,P), carateristicasCam(TRUCK,O,_,_,_,_),PESOTOTAL is P+O.

tempoouenergiautil(PESOCAMIAO,PESOMAXIMO,TOE,TOEUTIL):-TOEUTIL is TOE*PESOCAMIAO/PESOMAXIMO.

tempoaconsiderar(TEMPOCARREGARCAMIAO,TEMPODESCARGAENCOMENDAS,TEMPOACONSIDERAR):-TEMPOCARREGARCAMIAO>TEMPODESCARGAENCOMENDAS,!,TEMPOACONSIDERAR is TEMPOCARREGARCAMIAO;TEMPOACONSIDERAR is TEMPODESCARGAENCOMENDAS.


temporecarregamentototal(TRUCK,TEMPO):-carateristicasCam(TRUCK,_,_,_,_,TEMPO),!.
% Se o penï¿½ltimo argumento for 5, significa que o tempo de
% recarregamento necessita apenas de ser o estritamente necessï¿½rio para
% completar a viagem atï¿½ ao armazï¿½m seguinte (ou seja, chegar a este com
% a bateria a 16%
temporecarregamentoparcial(TRUCK,BATATUAL,TEMPO,5,BATUTNEC):-bateriaminima(TRUCK,BATMIN),B is BATATUAL-BATUTNEC, A is BATMIN-B,amplitudemaxima(TRUCK,AMPLITUDEMAX),temporecarregamentototal(TRUCK,TEMPOMAXIMO), TEMPO is TEMPOMAXIMO*A/AMPLITUDEMAX.
temporecarregamentoparcial(TRUCK,BATATUAL,TEMPO,_,_):- bateriamaxima(TRUCK,BATMAX),temporecarregamentototal(TRUCK,TEMPOMAXIMO),amplitudemaxima(TRUCK,AMPLITUDEMAX),AMPLITUDEATUAL is BATMAX-BATATUAL, TEMPO is AMPLITUDEATUAL*TEMPOMAXIMO/AMPLITUDEMAX.

%para um dado camiao, calcula a bateria maxima e minima (80%,20%).
bateriamaxima(TRUCK,B):-carateristicasCam(TRUCK,_,_,C,_,_), B is C*8/10.
bateriaminima(TRUCK,B):-carateristicasCam(TRUCK,_,_,C,_,_), B is C*2/10.
amplitudemaxima(TRUCK,AMPLITUDEMAXIMA):-bateriamaxima(TRUCK,A),bateriaminima(TRUCK,B),AMPLITUDEMAXIMA is A-B.

% dia = soma dia=LC[p,b,g] dia+LC=LLC[[p,2,3],[b,1,7],[g,5,4]] LLC
somafinal(DIA,MAJ1_MIN2, S):-
    listaCidades(DIA,LLC),
    fatiaDeLLC(DIA,MAJ1_MIN2, LLC,LLTRsC),
    (MAJ1_MIN2 is 2 ->listaMin(LLTRsC, LM); listaMaj(LLTRsC, LM)),
     list_sum(LM,S).
%([20,30],[10,70],[50,40])--->([20,10,40])
listaMin([],[]).
listaMin([B|C], [M|LM]):- list_min(B,M), listaMin(C,LM).
list_min([L|Ls], Min) :- list_min(Ls, L, Min).
list_min([], Min, Min).
list_min([L|Ls], Min0, Min) :-Min1 is min(L, Min0), list_min(Ls, Min1, Min).

listaMaj([],[]).
listaMaj([B|C], [M|LM]):- list_max(B,M), listaMaj(C,LM).
list_max([P|T], O) :- list_max(T, P, O).
list_max([], P, P).
list_max([H|T], P, O):-( H>P -> list_max(T, H, O);list_max(T, P, O)).

list_sum([],0).
list_sum([Head | Tail], TotalSum) :- list_sum(Tail, Sum1),TotalSum is Head+Sum1.
%dia=LC[p,b,g], todas as cidades para 1 dia
%(20221205)--->([p,b,g])
listaCidades(DIA, LLC):- findall(CD,entrega(_,DIA,_,CD,_,_),LC),length(LC, TAMANHO), metodoLCpLLC(LC, TAMANHO,LLC).
%metodoLCpLLC(_,0,[]).
% metodoLCpLLC([H|T], S, [LLC|LLC2]):- append([LLC], [T|H], LLC2), S1 is
% (S-1), metodoLCpLLC([T|H], S1, LLC2).
metodoLCpLLC(_,0,[]):-!.
metodoLCpLLC([A|B],TAMANHO,[[A|B],LISTADECAMINHOS]):-TAMANHO1 is TAMANHO-1,last(B,C),delete(B,C,D) ,metodoLCpLLC([C,A|D],TAMANHO1,LISTADECAMINHOS).

%[b,c,a],[c,a,b],[a,b,c].
fatiaDeLLC(_,_,[],_).
fatiaDeLLC(DIA,MAJ1_MIN2,[LC|LLC], LLTRsC):- listaCompleta(DIA,MAJ1_MIN2, LC,LTRsC), fatiaDeLLC(DIA,MAJ1_MIN2,LLC, [LLTRsC|LTRsC]).

% dia+LC[p,b,g]= definimos LTGoGo[2,3]. transformamos GoGo em Real.
% Acrescentamos a lista de tempos reais a LLTsC (Lista de listas de
% tempos sem cidades).
% (20221205, [p,b,g])--->([20,30],[10,70],[50,40])
listaCompleta(_,_,[],[]).
listaCompleta(DIA,MAJ1_MIN2, [C|LC],[LLTRsC|LTReal]):-
    findall(T,dadosCam_t_e_ta(_,_,C,T,_,_), LTGoGo),
    listaTempos(C,DIA,10,MAJ1_MIN2 ,LTGoGo,  LTReal),
    listaCompleta(DIA,MAJ1_MIN2, LC,LLTRsC).
% recebemos cidade, dia e LTGoGo. Transformamos cada elemento da LTGoGo
% em Tempos reais sabendo o dia e a cidade. Metodo recursivo.
% (p, 20221205, [2,3])--->([20,30])
listaTempos(_,_,_,_,[],[]).
listaTempos(C,DIA,TA,MAJ1_MIN2, [X|Y], [Z|LTR]):-
    contas(MAJ1_MIN2, TA, C, DIA, X, Z),
    listaTempos(C, DIA,TA,MAJ1_MIN2, Y,LTR) .
% recebemos cidade, dia e X(tempo de trajeto). acedemos Ã  massa(M) e ao
% tempo de descarga(T) de mercadoria. calculamos o Z (tempo real).
% (p, 20221205, 2)--->(20)
contas(MAJ1_MIN2,TA,C,DIA,X,Z):-

    (MAJ1_MIN2 is 2 ->
    (findall(M,entrega(_,DIA,M,C,_,_),ME),
    findall(T,entrega(_,DIA,_,C,_,T),TR),
     (length(ME,TM),TM=0,M is 0,A is 0;M is ME,A is TR),
    Z is (A+((X*(7500+M))/11800))

    );

    %MAJ1_MIN2 is 1, para o majorante
    (   findall(M,entrega(_,DIA,M,C,_,_),ME),
    findall(T,entrega(_,DIA,_,C,_,T),TR),
        (length(ME,TM),TM=0,M is 0,A is 0;M is ME,A is TR),
%!
    Z is (A+((X*(7500+(4300-M)))/11800)+TA)
    )
    ).
