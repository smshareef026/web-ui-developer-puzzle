#### Code review

# Added Type Notation to make use TypeScript Advantage, to make "item" being of Type : <any> to "ReadingListItem". [FIXED][file: reading-list.component.ts, line:16]
# Need to make the book search of async pipe to avoid memory leak because it didn't unsubscribe after subscribing. [FIXED][file: book-search.component.ts, lines: 19,35-37, 20; book-search.component.html lines: 18]
# reducer were not available for failedAddToReadingList and failedRemoveFromReadingList actions, Need to be added.

#### Accessibility issues

## Issues from automated scan

# Background and foreground colors do not have a sufficient contrast ratio.[FIXED]

## Manually found issues

# Added alt tag for the all the images which is good practice incase url to load images fail.[FIXED]

# Buttons should have aria-label for better accessibility as the screen reader will read out the aria label to improve Accessibilty.[FIXED]


## Test Cases Issue:
# Fixed testcases as its missing few scenarios on reading-list.reducer file.[FIXED]
