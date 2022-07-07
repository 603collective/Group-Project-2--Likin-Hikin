// get one product
router.get('/:state', async (req, res) => {
    // find a trails by state`
        try {
      const searchData = await stateSearch.findAll({
        where: {
          state:userQuery 
        },
        include: [{ model: Trail }],
      });
  
      if (!searchData) {
        res.status(404).json({ message: 'No trails found in that state!' });
        return;
      }
  
      res.status(200).json(searchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  