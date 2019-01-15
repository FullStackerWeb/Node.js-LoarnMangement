## Models

# Loan

 - Fields: Loan date, bank name, loan amount, loan balance, partial payments made
 opening date, due date, project details
 
# Loan notes

- Fields: loan ID, note, date, title


# Events

- Fields: date, event, note, loan id
NB: Events will be implemeted later when it is clear.

# User

- Fields: email, password, first name, last name

NB: Currently not handling file upload for both timeline, profile or loans

## API endpoints:
Implement: edit, add partial payment, add note, delete
Not implementing any filter, not implementing file upload/management
Not implementing filter
Not implementing date range filter

- Get user details
- Get all loans
- POST Loan
- PUT loan
- Get loan details with ID (loan timeline/activities)

