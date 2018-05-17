#!/usr/bin/env python

'''
FILE: compile.py
Author: Chris Piech with additions from Nick Troccoli
----------------
Template compiler that compiles all .html template files in the TEMPLATE_DIR
directory below (excluding .ptl files, which are partial templates), and outputs
with the same filenames to the OUTPUT_DIR directory.  Use -t to compile for
running locally; otherwise, templates are compiled to be hosted at the ROOT url.
Example usage:

> python compile.py -t --output_dir WWW

Compiles all template files using local paths, and outputs the compiled files to
the WWW directory.  The compiled files in WWW/ have the same directory structure
as in the TEMPLATE_DIR directory.

> python compile.py

Compiles all template files using ROOT path, and outputs the compiled files to
the *current* directory.  The compiled files in the current directory have the
same directory structure as in the TEMPLATE_DIR directory.
----------------

'''

import os.path
from plugins.bottle.bottle import SimpleTemplate
import sys
import json

IGNORE_DIRS = [
    'parts'
]

TEMPLATE_DIR = 'templates'

OUTPUT_DIR = '.'

# Assumed to be within OUTPUT_DIR
SECTION_DIR = 'section'

# The root URL at which this webpage is hosted
ROOT = '//web.stanford.edu/class/archive/cs/cs106a/cs106a.1184/'

# Use the -t flag if you want to compile for local tests
DEPLOY = not '-t' in sys.argv
    

'''
FUNCTION: compile
-----------------
Parameters: NA
Returns: NA

This function compiles all the html files (recursively)
from the templates dir into the current folder. Folder
hierarchy is preserved.
-----------------
''' 
def compile():
    # Read in course data
    sectionData = searchSectionDirectory()

    # Compile all templates
    templateFilePaths = getTemplateFilePaths('')
    print("\nCompiling:\n----------")
    for templateFilePath in templateFilePaths:
        print("Compiling " + templateFilePath + "...")
        outputPath = compileTemplate(templateFilePath, sectionData)
        print(templateFilePath + " -> " + outputPath)

    print("\nDONE.\n")

'''
FUNCTION: searchSectionDirectory
---------------------------------
Parameters: NA
Returns: a list of section material tuples: (path, solutionsReleaseDateString).
The path is the path to the folder containing section i+1's materials.  The date
string is read from info.json and is a "YYYYMMDDHH" string of when the solution 
materials should be released.  Assumes the following are in each directory:
    - Section[i+1]-Solutions.pdf
    - Section[i+1].pdf
    - Section[i+1].zip
    - info.json with the format { solutionsDate: "YYYYMMDDHH" }
---------------------------------
'''
def searchSectionDirectory():
    sectionDirPath = OUTPUT_DIR + '/' + SECTION_DIR + '/'
    paths = []
    for fileName in os.listdir(sectionDirPath):
        if not fileName.startswith("."):
            filePath = os.path.join(sectionDirPath, fileName)
            with open(filePath + '/info.json', 'rb') as infoFile:
                info = json.load(infoFile)
                solutionsDate = info['solutionsDate']
                paths.append((
                        os.path.join(SECTION_DIR, fileName), 
                        solutionsDate
                    )
                )
    paths.sort()
    return paths

'''
FUNCTION: getTemplateFilePaths
------------------------------
Parameters:
    templateRoot - the folder within TEMPLATE_DIR to get file paths for

Returns: a list of .html template file paths from within the given directory
within TEMPLATE_DIR.  Ignores .ptl files, which are partial templates.
------------------------------
'''
def getTemplateFilePaths(templateRoot):
    if templateRoot in IGNORE_DIRS:
        return []
    paths = []
    templateDirPath = os.path.join(TEMPLATE_DIR, templateRoot)
    for fileName in os.listdir(templateDirPath):
        filePath = os.path.join(templateRoot, fileName)
        templateFilePath = os.path.join(TEMPLATE_DIR, filePath)

        # Recurse if it's a directory, add if it's a template file
        if os.path.isdir(templateFilePath):
            childPaths = getTemplateFilePaths(filePath)
            for childPath in childPaths:
                paths.append(childPath)
        elif isTemplateFile(fileName):
            paths.append(filePath)

    return paths

'''
FUNCTION: isTemplateFile
------------------------
Parameters:
    fileName - the fileName to check is a template file

Returns: whether or not the given filename is a template file (ends with .html)
------------------------
'''
def isTemplateFile(fileName):
    extension = os.path.splitext(fileName)[1]
    return extension == '.html'

'''
FUNCTION: compileTemplate
-------------------------
Parameters:
    relativePath - the path within TEMPLATE_DIR of the template file to compile
    sectionData - the list of section folders.  Passed in as a parameter to
                    render the template.

Returns: the path of the saved, compiled template file.

Compiles the given template file, passing in the pathToRoot and sectionData as
template parameters.  Saves the compiled
template to relativePath in the OUTPUT_DIR directory.
-------------------------
'''
def compileTemplate(relativePath, sectionData):
    pathToRoot = getPathToRootFrom(relativePath)
    filePath = os.path.join(TEMPLATE_DIR, relativePath)
    templateText = open(filePath).read()
    compiledHtml = SimpleTemplate(templateText).render(pathToRoot=pathToRoot,
        sections=sectionData)
    compiledHtml = compiledHtml.encode('utf8')

    relativePath = os.path.join(OUTPUT_DIR, relativePath)
    makePath(relativePath)
    open(relativePath, 'wb').write(compiledHtml)
    return relativePath

'''
FUNCTION: getPathToRootFrom
---------------------------
Parameters:
    relativePath - the path to start at when calculating the path to the root

Returns: the path to the root directory from the given relativePath.
---------------------------
'''
def getPathToRootFrom(relativePath):
    if DEPLOY:
        return ROOT
    return getRelPathToRootFrom(relativePath)

'''
FUNCTION: getRelPathToRootFrom
------------------------------
Parameters:
    relativePath - the path to start at when calculating the path to the root

Returns: the relative path to the root directory from the given relativePath.
    Concatenates "../" for each level down from the root.
------------------------------
'''
def getRelPathToRootFrom(relativePath):
    depth = depthFromRoot(relativePath)
    pathToRoot = './' + ''.join(['../' for i in range(depth)])
    return pathToRoot

'''
FUNCTION: depthFromRoot
-----------------------
Parameters:
    filePath - the path for which to calculate the depth

Returns: the number of levels filePath is from the root level.
    E.g. 'index.html' -> 0
         'stuff/index.html' -> 1
         'stuff/moreStuff/index.html' -> 2
-----------------------
'''
def depthFromRoot(filePath):
    rootPath = os.path.dirname(filePath)
    if len(rootPath) == 0: return 0
    return depthFromRoot(rootPath) + 1
    
'''
FUNCTION: makePath
------------------
Parameters:
    path - the path to make directories for

Returns: NA

Creates all needed directories in this path for the directory path to exist.
E.g. if path = 'stuff/moreStuff/index.html' then the stuff and moreStuff
directories would be created if they did not already exist.
------------------
'''
def makePath(path):
    dirPath = os.path.dirname(path)
    if dirPath != '' and not os.path.exists(dirPath):
        os.makedirs(dirPath)


if __name__ == '__main__':
    compile()
