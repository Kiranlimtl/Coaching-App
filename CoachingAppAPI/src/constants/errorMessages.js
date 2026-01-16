const ERROR_MESSAGES = {
    COACH_NOT_FOUND: 'Coach not found',
    INVALID_DATA: 'Invalid data',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'You do not have permission to perform this action',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    PASSWORD_MISMATCH: "Passwords do not match",
    COACH_NOT_FOUND: "Coach not found",
    INVALID_TOKEN: "Invalid token",
    EMPTY_UPDATES: "No fields provided for updates",
    DELETE_COACH_FAIL: "Failed to delete coach",
    FETCH_COACHES_FAIL: "Failed to fetch coaches",
    STUDENT_NOT_FOUND: "Student not found",
    DELETE_STUDENT_FAIL: "Failed to delete student",
    FETCH_STUDENTS_FAIL: "Failed to fetch students",
    CLASS_NOT_FOUND: "Class not found",
    DELETE_CLASS_FAIL: "Failed to delete class",
    FETCH_CLASSES_FAIL: "Failed to fetch classes",
    PAYMENT_NOT_FOUND: "Payment record not found",
    NO_STUDENTS_IN_CLASS: "No students enrolled in the class",
    CREATE_PAYMENT_FAIL: "Failed to create payment record",
    FETCH_PAYMENTS_FAIL: "Failed to fetch payment records",
    UPDATE_PAYMENT_FAIL: "Failed to update payment record",
    PAYMENT_ALREADY_PAID: "Payment has already been marked as paid",
    RATE_TIER_NOT_FOUND: "Rate tier not found",
    LEVEL_NOT_FOUND: "Level not found",
    NO_CHANGES_TO_APPLY: "No changes to apply after validation",
    NO_CHANGES_DETECTED: "No changes detected",
    COACH_CANNOT_MAKE_PAYMENT_THIS_CLASS: "Coach is not assigned to this class, you can only make payments for your own class",
    PAYMENT_ALREADY_EXISTS_FOR_CLASS: "A payment record already exists for this class",
    FETCH_CLASS_ITEM_AS_LIST_FAIL: "Failed to fetch class item as list"


}

export default ERROR_MESSAGES;