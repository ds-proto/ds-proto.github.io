# ds-proto.github.io

Final product for an Intro to Data Science project.

## Using the IPython Notebooks

To use the IPython Notebooks, you'll need to install Python 2.7, as well as a few
libraries:

- [IPython](http://ipython.org/)
- [pandas](http://pandas.pydata.org/)
- [matplotlib](http://matplotlib.org/)
- [NumPy](http://www.numpy.org/)
- [SciPy](http://www.scipy.org/)
- [Seaborn](http://stanford.edu/~mwaskom/software/seaborn/)

If you just want Python and a grab bag of its canonical science libraries, try
downloading [Anaconda](https://www.continuum.io/downloads). It should have all
the libraries listed above.

Once you have IPython installed, you should be able to enter
```
ipython notebook
```
into a console, bringing up the IPython web interface.

## Web Page Format

We're currently displaying our results on the project's web page using:

- [Dimple](http://dimplejs.org/): a javascript library intended to make working
with D3 easier.
- [Skeleton](http://getskeleton.com/): a minimal CSS boilerplate.

This is fairly subject to change.

## Datasets

The datasets should be stored in the
[data](https://github.com/ds-proto/ds-proto.github.io/tree/master/data) folder
in the repository. The datasets we're interested in are:

### [The 2014 US Aid dataset](https://github.com/ds-proto/ds-proto.github.io/blob/master/data/us_aid.csv)
This dataset on foreign government aid can be found on the [Foreign Aid Explorer](http://explorer.usaid.gov/) website.

### [Human Development Reports](http://hdr.undp.org/en/data)
This dataset reports on worldwide education, life expectancy, economy, and various other metrics of a country's wellbeing.
