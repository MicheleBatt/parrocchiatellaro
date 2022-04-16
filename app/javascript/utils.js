
export const CURRENCY_EURO = '€'


export const parseMonth = (month) => {
    switch (month) {
        case 1 :
            return 'Gennaio';
        case 2 :
            return 'Febbraio';
        case 3 :
            return 'Marzo';
        case 4 :
            return 'Aprile';
        case 5 :
            return 'Maggio';
        case 6 :
            return 'Giugno';
        case 7 :
            return 'Luglio';
        case 8 :
            return 'Agosto';
        case 9 :
            return 'Settembre';
        case 10 :
            return 'Ottobre';
        case 11 :
            return 'Novembre';
        case 12 :
            return 'Dicembre';
        default:
            return '';
    }
}

export function isValidMovement (movement) {
    return movement && movement.currency_date && movement.movement_type && movement.amount &&
        (movement.expensive_item_id || movement.movement_type === 'in') && movement.causal
}

export const parseAmount = (amount) => {
    return amount.toFixed(2).toString() + CURRENCY_EURO
}