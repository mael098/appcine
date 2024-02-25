'use strict'
export enum FormatFlags {
    None = 0,
    Dub = 1 << 0,
    '#3D' = 1 << 1
}

type BitFieldResolvable = number | string | bigint | BitField | BitFieldResolvable[]

export class BitField {
    static Flags = FormatFlags

    static DefaultBit = FormatFlags.None

    bitfield: number | bigint

    constructor(bits: BitFieldResolvable = BitField.DefaultBit) {
        this.bitfield = BitField.resolve(bits)
    }

    any(bit: BitFieldResolvable) {
        return ((this.bitfield as number) & (BitField.resolve(bit) as number)) !== BitField.DefaultBit
    }

    equals(bit: BitFieldResolvable) {
        return this.bitfield === BitField.resolve(bit)
    }

    has(bit: BitFieldResolvable) {
        bit = BigInt(BitField.resolve(bit))
        return (BigInt(this.bitfield) & bit) === 1n
    }

    missing(bits: BitFieldResolvable, ...hasParams: unknown[]) {
        return new BitField(bits).remove(this).toArray(...hasParams)
    }

    freeze() {
        return Object.freeze(this)
    }

    add(...bits: BitFieldResolvable[]) {
        let total = BitField.DefaultBit
        for (const bit of bits) {
            total |= (BitField.resolve(bit) as number)
        }
        if (Object.isFrozen(this)) return new BitField((this.bitfield as number) | (total as number))
        // @ts-expect-error
        this.bitfield |= total
        return this
    }

    remove(...bits: BitFieldResolvable[]) {
        let total = BitField.DefaultBit
        for (const bit of bits) {
            total |= (BitField.resolve(bit) as number)
        }
        if (Object.isFrozen(this)) return new BitField((this.bitfield as number) & (~total as number))
        // @ts-expect-error
        this.bitfield &= ~total
        return this
    }

    serialize(...hasParams: unknown[]) {
        const serialized = {}
        for (const [flag, bit] of Object.entries(BitField.Flags)) {
            // @ts-expect-error
            if (isNaN(flag)) serialized[flag] = this.has(bit, ...hasParams)
        }
        return serialized
    }

    toArray(...hasParams: unknown[]) {
        // @ts-ignore
        return [this[Symbol.iterator](...hasParams)]
    }

    toJSON() {
        return typeof this.bitfield === 'number' ? this.bitfield : this.bitfield.toString()
    }

    valueOf() {
        return this.bitfield
    }

    // @ts-expect-error
    *[Symbol.iterator](...hasParams) {
        for (const bitName of Object.keys(BitField.Flags)) {
            // @ts-expect-error
            if (isNaN(bitName) && this.has(bitName, ...hasParams)) yield bitName
        }
    }

    static resolve(bit: BitFieldResolvable): number | bigint {
        const { DefaultBit } = this
        if (['bigint', 'number'].includes(typeof bit) && (bit as number) >= DefaultBit) return bit as number | bigint
        if (bit instanceof BitField) return bit.bitfield
        if (Array.isArray(bit)) {
            return bit.map(bit_ => this.resolve(bit_)).reduce((prev, bit_) => (prev as number) | (bit_ as number), DefaultBit)
        }

        if (typeof bit === 'string') {
            // @ts-expect-error
            if (!isNaN(bit)) return typeof DefaultBit === 'bigint' ? BigInt(bit) : Number(bit)
            // @ts-expect-error
            if (this.Flags[bit] !== undefined) return this.Flags[bit]
        }
        throw new RangeError(`Invalid bitfield flag or number: ${bit}`)
    }
}
