//======//
// Enum //
//======//
declare type CellType = "dummy" | "root" | "slot" | "creation" | "destruction" | "recording"
declare type PulseType = "raw" | "creation" | "destruction"
declare type PulseColour = "blue" | "green" | "red"
declare type WireColour = "any" | "blue" | "green" | "red"
declare type Timing = 0 | -1 | 1
declare type Direction = 1 | -1
declare type NoganType = "real" | "projection"
declare type Tense = "past" | "future"

//=========//
// Utility //
//=========//
declare type Vector2D = [number, number]
declare type CellTemplate = { type: CellType; position: Vector2D }
declare type ReverseRecord<T> = unknown extends {
	[K in keyof T]-?: T[K] extends Omit<T, K>[Exclude<keyof T, K>] ? unknown : never
}[keyof T]
	? never
	: T[keyof T]

//=======//
// Pulse //
//=======//
declare type BasePulse = {
	type: PulseType
}

declare type RawPulse = BasePulse & {
	type: "raw"
}

declare type CreationPulse = BasePulse & {
	type: "creation"
	template: CellTemplate
}

declare type DestructionPulse = BasePulse & {
	type: "destruction"
}

declare type Pulse = RawPulse | CreationPulse | DestructionPulse

declare type Fire = {
	red: Pulse | null
	green: Pulse | null
	blue: Pulse | null
}

//====//
// Id //
//====//
declare type CellId = number
declare type WireId = number

//======//
// Cell //
//======//
declare type Cell = {
	id: CellId
	parent: CellId
	type: CellType
	position: Vector2D
	cells: CellId[]
	inputs: WireId[]
	outputs: WireId[]
	fire: Fire
}

//======//
// Wire //
//======//
declare type Wire = {
	id: WireId
	colour: WireColour
	timing: Timing
	source: CellId
	target: CellId
}

//=======//
// Nogan //
//=======//
declare type Nogan = {
	type: NoganType
	nextCell: CellId
	nextWire: WireId
	archivedCells: CellId[]
	archivedWires: WireId[]
	deletedCells: CellId[]
	deletedWires: WireId[]
	items: { [id: number]: Cell | Wire | null }
}

//===========//
// Operation //
//===========//
declare type Operation = any //todo

//======//
// Peak //
//======//
declare type TenseInfo = {
	from: Tense
	to: Tense
} & (
	| {
			from: "past"
			to: "future"
	  }
	| {
			from: "future"
			to: "past"
	  }
)

declare type BasePeak = {
	result: boolean
	operations: Operation[]
}

declare type FailPeak = {
	result: false
	operations: Operation[]
}

declare type SuccessPeak = {
	result: true
	operations: Operation[]
	pulse: Pulse
}

declare type Peak = FailPeak | SuccessPeak
declare type Peaker = (
	nogan: Nogan,
	options: {
		id: CellId
		colour: PulseColour
	} & Record<Tense, Nogan[]>,
) => Peak

declare type Behaviour = (
	nogan: Nogan,
	options: {
		peak: Peak
		target: CellId
	},
) => Peak

//=========//
// Phantom //
//=========//
// declare type WireColour = "any" | "blue" | "green" | "red"

// declare type Wire = BaseCell & {
// 	isWire: true
// 	isNod: false
// 	colour: WireColour
// 	timing: 0 | -1 | 1
// 	source: Id
// 	target: Id
// }

// declare type PulseColour = "blue" | "green" | "red"
// declare type PulseType = "any" | "creation" | "destruction"

// declare type Pulse = {
// 	type: PulseType
// 	colour: PulseColour
// }

// declare type PhantomPulse = Pulse & {
// 	type: "any"
// }

// declare type Pulses = {
// 	red: Pulse | null
// 	green: Pulse | null
// 	blue: Pulse | null
// }

// declare type PhantomPulses = Pulses & {
// 	red: PhantomPulse
// 	green: PhantomPulse
// 	blue: PhantomPulse
// }

// declare type NodType = "any" | "slot" | "creation" | "destruction" | "recording"

// declare type Vector2D = [number, number]

// declare type NodTemplate = {
// 	position: Vector2D
// 	type: NodType
// }

// declare type Nod = BaseChild & {
// 	isNod: true
// 	isWire: false
// 	outputs: Id[]
// 	inputs: Id[]
// 	pulses: Pulses
// 	position: Vector2D
// 	type: NodType
// }

// declare type Phantom = Nod & {
// 	isPhantom: true
// 	id: PhantomId
// 	pulses: PhantomPulses
// }

// declare type Nogan = Nod | Wire | Phantom
// declare type Parent = Nod | Phantom
// declare type Child = Nod | Wire

// declare type Operation = {
// 	type: OperationType
// 	data: any
// }

// declare type BasePeak = {
// 	schemaName: string
// 	result: boolean
// 	operations: Operation[]
// }

// declare type FailPeak = BasePeak & {
// 	schemaName: "FailPeak"
// 	result: false
// }

// declare type SuccessPeak = {
// 	schemaName: "SuccessPeak"
// 	result: true
// 	operations: Operation[]
// 	type: PulseType
// 	template: NodTemplate
// 	data: any
// }

// declare type Peak = FailPeak | SuccessPeak

// declare type FullPeak = {
// 	schemaName: "FullPeak"
// 	result: boolean
// 	red: Peak
// 	green: Peak
// 	blue: Peak
// }

// declare type Behave = (parent: Parent, { peak, id }: { peak: SuccessPeak; id: Id }) => Peak

// declare type OperationType = "modify" | "fired"
// declare type Operate = (parent: Parent, { id, data }: { id: Id; data: any }) => void
