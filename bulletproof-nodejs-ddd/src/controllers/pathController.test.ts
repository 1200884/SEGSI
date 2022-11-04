import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IPathService from "../services/IServices/IPathService";
import PathController from "./pathController";
import IPathDTO from '../dto/IPathDTO';


describe('path controller', function () {
	beforeEach(function() {
    });

    it('createPath: returns json with id+name values', async function () {
        let body = { "name":'path436' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pathServiceClass = require(config.services.path.path).default;
		let pathServiceInstance = Container.get(pathServiceClass)
		Container.set(config.services.path.name, pathServiceInstance);

		pathServiceInstance = Container.get(config.services.path.name);
		sinon.stub(pathServiceInstance, "createPath").returns( Result.ok<IPathDTO>( {"pathid": "437","warehouseDestination": req.body.warehouseDestination, "warehouseDeparture":req.body.warehouseDeparture,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime} ));

		const ctrl = new PathController(pathServiceInstance as IPathService);

		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "pathid": "437","warehouseDestination": req.body.warehouseDestination, "warehouseDeparture":req.body.warehouseDeparture,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime}));
	});
});
