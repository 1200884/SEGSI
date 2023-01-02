import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import ITravelsDTO from "../dto/ITravelsDTO";
import { TravelsId } from "./travelsId";

interface TravelsProps {
    trucks: [string];
    deliveries: [[number]];
}

export class Travels extends AggregateRoot<TravelsProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get travelsId(): TravelsId {
        return new TravelsId(this.travelsId.toValue());
    }

    get trucks(): [string] {
        return this.props.trucks;
    }

    set trucks(value: [string]) {
        this.props.trucks = value;
    }

    get deliveries(): [[number]] {
        return this.props.deliveries;
    }

    set deliveries(value: [[number]]) {
        this.props.deliveries = value;
    }

    private constructor(props: TravelsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(travelsDTO: ITravelsDTO, id?: UniqueEntityID): Result<Travels> {
        const trucks = travelsDTO.trucks;
        const deliveries = travelsDTO.deliveries;

        const travels = new Travels({ trucks: trucks, deliveries: deliveries }, id);
        return Result.ok<Travels>(travels)
    }
}
