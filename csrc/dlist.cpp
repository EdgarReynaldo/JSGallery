



#include "Eagle/backends/Allegro5Backend.hpp"
#include "Eagle/FileSystem.hpp"

#include <vector>
#include <string>
#include <iostream>
using namespace std;



int main(int argc , char** argv) {
   
   (void)argc;
   (void)argv;
   
   EnableLog();
   
   Allegro5System* sys = GetAllegro5System();
   
   if (sys->Initialize(EAGLE_SYSTEM) != EAGLE_SYSTEM) {
      EagleCritical() << "Failed to initialize eagle system. Aborting." << std::endl;
      return -1;
   }

   bool listall = true;
   bool listfolders = false;
   bool listallfiles = false;
   bool listimagefiles = false;
   bool listaudiofiles = false;
   bool listvideofiles = false;
   
   bool forallsubfolders = false;
   
   bool showallusage = false;
   bool showlistusage = false;
   bool showpathusage = false;
   
   FSInfo rootinfo = GetFileInfo("./");
   
   vector<string> dirlist;
   
   /// Handle args to program
   if (argc < 2) {
      dirlist.push_back(rootinfo.Path());
   }
   for (int i = 1 ; i < argc ; ++i) {
      const char* arg = argv[i];
      if ((strncmp(arg , "/a:" , 3) == 0) && (strlen(arg) > 3)) {
         listall = false;
         for (int n = 3 ; n < (int)strlen(arg) ; ++n) {
            char c = arg[n];
            switch (c) {
               
            case 'd' : listfolders    = true;break;
            case 'f' : listallfiles   = true;break;
            case 'i' : listimagefiles = true;break;
            case 'a' : listaudiofiles = true;break;
            case 'v' : listvideofiles = true;break;

            default :
               cout << StringPrintF("Unknown list directive '%c' given to attribute argument /a:" , c) << endl;
               showlistusage = true;
               break;
            }
         }
      }
      else if (strcmp(arg , "/s") == 0) {
          forallsubfolders = true;
      }
      else if (strcmp(arg , "/?") == 0) {
          showallusage = true;
      }
      else {
         FSInfo finfo = GetFileInfo(arg);
         if (finfo.Exists() && finfo.Mode().IsDir()) {
            dirlist.push_back(finfo.Path());
         }
         else {
            if (!finfo.Exists()) {
               cout << StringPrintF("File path '%s' does not exist!" , arg) << endl;
            }
            if (!finfo.Mode().IsDir()) {
               cout << StringPrintF("File path '%s' is not a folder!" , arg) << endl;
            }
            showpathusage = true;
         }
      }
   }
   
   if (showlistusage || showallusage) {
      
   }
   
   
   return 0;
};
