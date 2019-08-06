
SRC=$(wildcard $(SRC_PATH)/*.c)
OBJS=$(patsubst %.c,%.o,$(SRC))

LDLIBS=$(patsubst %, $(TARGET_PATH)/lib%.a, $(DEPS))

all:$(ARCH)-$(LIBNAME).a

$(ARCH)-$(LIBNAME).a: $(OBJS)
	@echo $(LDLIBS) $(OBJS)
	$(AR) rcs $@ $(OBJS)
	ranlib $@

clean:
	rm $(OBJS)

.PHONY: realclean
realclean: clean
	rm *.a
