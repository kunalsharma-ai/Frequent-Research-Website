// Start-up patches for the rest of the site (build 74: the home page's own are in app/startupCore.jsx) that change data owned by other files (logos, icon paths, celebration glyphs). They run after every
// module has loaded, in the order the files were built in before, so the data they change already exists.
import * as ee from 'react';
import { AF_P } from '../pages/AccountsFinance.jsx';

/* from pages/AccountsFinance64.jsx */
AF_P.refresh = "M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4";

