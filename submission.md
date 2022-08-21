# Submission Notes

• This assessment, specifically exercise #2, was deceptively challenging. At first glance I thought it seemed pretty doable but once you get into the nitty-gritty of the filtering and searching logic it got challenging. Nice job!
• Without having font files provided (or at least the name of the fonts used), I could not get the font to match the exercise reference images/gifs exactly. I just found some available fonts that were as close as possible.
• I thought about switching this project's bundler over to Webpack, as that is what I have been using recently, but since I'd never used Parcel before I figured I'd give it a shot (it worked really smoothly, no problems).
• I could not test in Microsoft Edge (latest version) because I do not have a PC (Mac > PC... in my opinion).

## Given more time, what would you have done differently?

There are a lot of things that I would have liked to complete/attempt if I had more time, such as:
    1. Figure out how to center the left double quote inside the orange circle pseudo element in Exercise #1. I couldn't figure out how to do that without changing it to an icon image or using something like FontAwesome or Icomoon.
    2. Style Exercise #2 a bit more accurately, specifically things like:
        • Add the carrot to the filter dropdowns.
        • Add the slight fade-up effect to the filter dropdowns.
        • Add the slight space with the protruding triangle between the filter dropdowns and the filter buttons.
        • Add the magnify glass to the search input field.
        • Add the dynamic filter count to the filter buttons.
    3. Find a style treatment to make all the media item posters the same size, I had some ideas on how to do this but none I loved (plus they aren't all the same size in the reference gif).
    4. Find a way to verify if the poster image Url from the API is loading and if not, add a placeholder image.
    5. Review my filter and search logic to attempt to find if there are better ways to do it since this was the first time I'd ever written logic similar to that.
        • Currently every time a filter changes, I am running a function that checks all the filters again. I would have liked to find a way to break that large function into individual functions for each filter and only run the function when its respective filter has changed.
    6. Review and style everything a bit better on the smaller screen sizes, especially the filters and search bar.
    7. Would have been nice to cap the number of media items and then add a button to show more, especially on smaller screen sizes.
    8. Would have liked to add a "No results" state when no results are being returned by the filters or search.

I really would have liked to attempt this with React or Vue if I was confident that I could have figured out how to do it close to the estimated 4-6 hours. It would have made the experience better by removing the flash of media items every time the filter or search runs and re-renders the media items. I did a React training project like this about a year or so ago where I used the PetFinder API to create an adoption gallery page but that was once and so long ago that I didn't trust myself to be able to get a presentable amount of that work done.

## How did you deviate from the directions, if at all, and why?

The only way I deviated from the directions was that I got carried away and spent a bit more time than the recommended 4-6 hours. I have worked with basic API connections like this before, though seldomly (since our Engineering Dept generally handles most of the API work), but I have never had to set up filtering and search before. So, I had to spend some time researching and planning out how I wanted to approach this, which helped me only have to start over once. I stopped at the current state of exercise #2 because I felt that if I invested more time to complete everything more thoroughly I would be deviating too much from the original expectation of this taking 4-6 hours. With that in mind, I am confident that I could have achieved everything I wanted to with more time.

## Is there anything else you'd like to let us know?

I really did enjoy this assessment and working on it definitely improved my familiarity with how to handle the filtering and searching of arrays. I also have a couple other developer friends that have tried to get me to send them the Github repository link so that they could take a stab at it because of what I've told them about it.