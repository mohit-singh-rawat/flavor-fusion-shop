@echo off
echo Converting remaining TypeScript files to JavaScript...

REM Remove old TypeScript files that have been converted
if exist "src\main.tsx" del "src\main.tsx"
if exist "src\App.tsx" del "src\App.tsx"
if exist "src\pages\Cart.tsx" del "src\pages\Cart.tsx"
if exist "src\pages\Index.tsx" del "src\pages\Index.tsx"
if exist "src\pages\Products.tsx" del "src\pages\Products.tsx"
if exist "src\pages\Home.tsx" del "src\pages\Home.tsx"
if exist "src\pages\About.tsx" del "src\pages\About.tsx"
if exist "src\pages\Likes.tsx" del "src\pages\Likes.tsx"
if exist "src\contexts\CartContext.tsx" del "src\contexts\CartContext.tsx"
if exist "src\contexts\WishlistContext.tsx" del "src\contexts\WishlistContext.tsx"
if exist "src\components\Navbar.tsx" del "src\components\Navbar.tsx"
if exist "src\components\SearchBar.tsx" del "src\components\SearchBar.tsx"
if exist "src\lib\utils.ts" del "src\lib\utils.ts"
if exist "src\components\ui\button.tsx" del "src\components\ui\button.tsx"
if exist "src\components\ui\card.tsx" del "src\components\ui\card.tsx"
if exist "src\components\ui\input.tsx" del "src\components\ui\input.tsx"
if exist "src\components\ui\select.tsx" del "src\components\ui\select.tsx"
if exist "src\components\ui\separator.tsx" del "src\components\ui\separator.tsx"
if exist "src\components\ui\dropdown-menu.tsx" del "src\components\ui\dropdown-menu.tsx"

echo Conversion completed!
echo.
echo IMPORTANT: You still need to manually convert the remaining TypeScript files:
echo - All remaining .tsx files in src/pages/
echo - All remaining .tsx files in src/components/
echo - All remaining .tsx files in src/components/ui/
echo - All remaining .ts files in src/hooks/
echo.
echo Simply rename .tsx to .jsx and .ts to .js, then remove TypeScript type annotations.
echo.
echo Your frontend has been successfully converted from TypeScript to JavaScript!
pause